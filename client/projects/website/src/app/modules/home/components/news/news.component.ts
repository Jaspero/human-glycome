import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {map, scan, startWith, switchMap, take} from 'rxjs/operators';
import {ImageSizeModification} from '../../../../shared/classes/image-modifications/image-size-modification.class';
import {News} from '../../../../shared/interfaces/collections/news.interface';
import {FirestoreCollection} from '../../../../shared/enums/firestore-collection.enum';
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {untilDestroyed} from '@ngneat/until-destroy';

@Component({
  selector: 'hg-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  constructor(private afs: AngularFirestore, private cdr: ChangeDetectorRef) {}

  loading$ = new BehaviorSubject(false);
  news$: Observable<News[]>;
  cantLoadMore$: Observable<boolean>;
  loadMore$ = new Subject();
  cursor: QueryDocumentSnapshot<News>;
  news;
  hasMore$ = new BehaviorSubject(true);
  imageModifications = [new ImageSizeModification(480)];

  ngOnInit() {
    this.cantLoadMore$ = combineLatest([this.hasMore$, this.loading$])
      .pipe(
        map(([hasMore, loading]) => loading || !hasMore)
      );

    this.loadMore$.pipe(
      startWith({}),
      switchMap(() => {
        this.loading$.next(true);

        return this.afs
          .collection(
            FirestoreCollection.News,
            ref => {
              let final;
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

              if (actions.docs.length < 5) {
                this.hasMore$.next(false);
              } else {
                this.cursor = actions.docs[
                actions.docs.length - 2
                  ] as QueryDocumentSnapshot<News>;
              }
              return actions.docs.reduce((acc, cur, ind) => {
                if (ind < 5 - 1) {
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
    ).subscribe(news => {
      this.news = news;
      this.cdr.markForCheck();
    });
  }
}
