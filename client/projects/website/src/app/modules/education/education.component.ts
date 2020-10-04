import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, queue, Subject} from 'rxjs';
import {map, scan, startWith, switchMap, take} from 'rxjs/operators';
import {Education} from '../../shared/interfaces/education/education-interface';
import {untilDestroyed} from '@ngneat/until-destroy';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';


@Component({
  selector: 'hg-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnInit {
  constructor(private afs: AngularFirestore, private cdr: ChangeDetectorRef) {}

  loading$ = new BehaviorSubject(false);
  pageSize = 5;
  cursor: QueryDocumentSnapshot<Education>;
  hasMore$ = new BehaviorSubject(true);
  loadMore$ = new Subject();
  education: Education[];
  loadMoreDisable$: Observable<boolean>;


  ngOnInit() {


    this.loadMoreDisable$ = combineLatest([this.hasMore$, this.loading$]).pipe(
      map(([hasMore, loading]) => loading || !hasMore)
    );

    this.loadMore$
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading$.next(true);

          return this.afs
            .collection<Education>(
              FirestoreCollection.Education,
              ref => {
                let final = ref
                  .limit(this.pageSize);

                if (this.cursor) {
                  final = final.startAfter(this.cursor);
                }
                return final;
              }
            )
            .get()
            .pipe(
              take(1),
              map((actions: any) => {
                this.loading$.next(false);

                if (actions.docs.length < this.pageSize) {
                  this.hasMore$.next(false);
                } else {
                  this.cursor = actions.docs[
                  actions.docs.length - 2
                    ] as QueryDocumentSnapshot<Education>;
                }
                return actions.docs.reduce((acc, cur, ind) => {
                  if (ind < this.pageSize - 1) {
                    acc.push({
                      id: cur.id,
                      ...cur.data()
                    });
                  }
                  return acc;
                }, []);
              })
            );
        }),
        scan((acc, curr) => acc.concat(curr), []),
      )
      .subscribe(education => {
        this.education = education;
        this.cdr.markForCheck();
      });
  }
}
