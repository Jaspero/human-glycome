import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
