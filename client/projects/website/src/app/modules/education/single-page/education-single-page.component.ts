import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TIME_PERIODS} from '../../../shared/consts/time-periods.const';
import {ObjectIdHelper} from '../../../shared/helpers/object-id.helper';
import {JasperoApiService} from '../../../shared/services/jaspero-api/jaspero-api.service';

@Component({
  selector: 'hg-education-single-page',
  templateUrl: './education-single-page.component.html',
  styleUrls: ['./education-single-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationSinglePageComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _jasperoApi: JasperoApiService
  ) {}

  singleEducation$: Observable<any>;
  createdAt: any;

  ngOnInit() {
    this._activatedRoute.params.subscribe(val => {
      this.singleEducation$ = this._jasperoApi.getSingle('education', val._id);

      this.createdAt = ObjectIdHelper.dateFromId(val._id);
    });
  }
}
