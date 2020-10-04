import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Resources} from '../../../../shared/interfaces/collections/resources.interface';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'hg-single-resource',
  templateUrl: './single-resource.component.html',
  styleUrls: ['./single-resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleResourceComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  resource: Resources;

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        map(({resources}) => resources),
      )
      .subscribe(item => {
        this.resource = item;
        this.cdr.markForCheck();
      });
  }
}
