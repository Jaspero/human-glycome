import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {BehaviorSubject, Subject} from 'rxjs';
import {map, scan, startWith, switchMap, take} from 'rxjs/operators';
import {FirestoreCollection} from '../../../../shared/enums/firestore-collection.enum';
import {News} from '../../../../shared/interfaces/collections/news.interface';
import {Education} from '../../../../shared/interfaces/education/education-interface';

@Component({
  selector: 'hg-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  constructor(private afs: AngularFirestore, private cdr: ChangeDetectorRef) {}

  loading$ = new BehaviorSubject(false);
  loadMore$ = new Subject();
  pageSize = 5;
  cursor: QueryDocumentSnapshot<Education>;
  news: News[];
  hasMore$ = new BehaviorSubject(true);


  ngOnInit() {
    this.loadMore$
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading$.next(true);

          return this.afs
            .collection<Education>(
              FirestoreCollection.News,
              ref => {
                let final = ref
                  .limit(this.pageSize)
                  .orderBy('createdOn', 'asc');

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

                this.hasMore$.next(actions.docs.length !== this.pageSize);
                this.cursor = actions.docs[actions.docs.length - 2] as QueryDocumentSnapshot<Education>;

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
      .subscribe(news => {
        this.news = news;
        this.cdr.markForCheck();
      });
  }
}
