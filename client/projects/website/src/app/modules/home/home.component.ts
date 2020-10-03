import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {RxDestroy} from '@jaspero/ng-helpers';
import {forkJoin} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BROWSER_CONFIG} from '../../shared/consts/browser-config.const';
import {TIME_PERIODS} from '../../shared/consts/time-periods.const';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';

declare const twttr: any;

@Component({
  selector: 'hg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends RxDestroy
  implements AfterViewInit, OnInit, OnDestroy {
  constructor(
    private _jasperoApi: JasperoApiService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  @ViewChild('twitter')
  twitterEl: ElementRef;

  iterations: Array<{
    title: string;
    items: Array<{name: string; link: string}>;
  }> = [
    // {
    //   title: 'Supporting Companies',
    //   items: [
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''},
    //     {name: 'Lorem', link: ''}
    //   ]
    // }
  ];
  currentIterationIndex = null;
  iterationTimer: any;

  ngOnInit() {
    if (BROWSER_CONFIG.isBrowser) {
      forkJoin(
        this._jasperoApi.paginated('full-members', {
          size: 5,
          sort: {fullName: 1}
        }),
        this._jasperoApi.paginated('associate-members', {
          size: 5,
          sort: {name: 1}
        })
      )
        .pipe(takeUntil(this.destroyed$))
        .subscribe(res => {
          this.iterations.push({
            title: 'Full Members',
            items: res[0].data.results.map(item => {
              item.name = `${item.title} ${item.fullName}`;
              return item;
            })
          });

          this.iterations.push({
            title: 'Associate Members',
            items: res[1].data.results
          });

          if (this.iterations.length > 1) {
            this.iterationTimer = setInterval(() => {
              this.currentIterationIndex =
                this.currentIterationIndex >= this.iterations.length - 1
                  ? 0
                  : this.currentIterationIndex + 1;

              this._cdr.detectChanges();
            }, TIME_PERIODS.minute);
          }

          this.currentIterationIndex = 0;
          this._cdr.detectChanges();
        });
    }
  }

  ngAfterViewInit() {
    if (BROWSER_CONFIG.isBrowser) {
      twttr.widgets.load(this.twitterEl.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.iterationTimer) {
      clearInterval(this.iterationTimer);
    }
    super.ngOnDestroy();
  }
}
