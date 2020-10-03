import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {TIME_PERIODS} from '../../shared/consts/time-periods.const';
import {ObjectIdHelper} from '../../shared/helpers/object-id.helper';
import {Education} from '../../shared/interfaces/education/education-interface';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';

@Component({
  selector: 'jaspero-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit {
  constructor(private _jasperoApi: JasperoApiService) {}

  education$: Observable<Education[]>;

  loading$ = new BehaviorSubject(false);
  currentPage$ = new BehaviorSubject(1);
  totalPages$ = new BehaviorSubject(1);
  cantLoadMore$: Observable<boolean>;
  itemsAccumulator = [];

  ngOnInit() {
    this.cantLoadMore$ = combineLatest(
      this.totalPages$,
      this.currentPage$
    ).pipe(
      map(([total, current]) => {
        return total <= current;
      })
    );

    this.education$ = this.currentPage$.pipe(
      withLatestFrom(this.totalPages$),
      filter(([current, total]) => total >= current),
      tap(() => this.loading$.next(true)),
      switchMap(([current]) =>
        this._jasperoApi.paginated(
          'education',
          {
            current,
            size: 5
          },
          TIME_PERIODS.tenMinutes
        )
      ),
      map(results => {
        this.totalPages$.next(results.data.total);
        this.itemsAccumulator = [
          ...this.itemsAccumulator,
          ...results.data.results.map(item => ({
            ...item,
            createdAt: ObjectIdHelper.dateFromId(item._id)
          }))
        ];

        return this.itemsAccumulator;
      }),
      tap(() => this.loading$.next(false))
    );
  }

  loadMore() {
    const current = this.currentPage$.getValue();
    this.currentPage$.next(!current ? 2 : current + 1);
  }
}
