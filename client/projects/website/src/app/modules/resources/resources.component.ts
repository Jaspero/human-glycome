import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';

interface StrippedResource {
  name: string;
  url: string;
}

@Component({
  selector: 'hg-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent implements OnInit {
  constructor(private _jasperoApi: JasperoApiService) {}

  loading$ = new BehaviorSubject(true);
  resources$: Observable<StrippedResource[]>;

  ngOnInit() {
    this.resources$ = this._jasperoApi
      .get<StrippedResource>('resources', {
        projection: {
          name: 1,
          url: 1
        }
      })
      .pipe(
        map(res => res.data),
        finalize(() => {
          this.loading$.next(false);
        })
      );
  }
}
