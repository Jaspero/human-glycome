import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TIME_PERIODS} from '../../../shared/consts/time-periods.const';
import {ObjectIdHelper} from '../../../shared/helpers/object-id.helper';
import {JasperoApiService} from '../../../shared/services/jaspero-api/jaspero-api.service';
import {map} from 'rxjs/operators';
import {Education} from '../../../shared/interfaces/education/education-interface';

@Component({
  selector: 'hg-education-single-page',
  templateUrl: './education-single-page.component.html',
  styleUrls: ['./education-single-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationSinglePageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  education: Education;
  createdAt: any;

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        map(({education}) => education),
      )
      .subscribe(item => {
        this.education = item;
      });
  }
}
