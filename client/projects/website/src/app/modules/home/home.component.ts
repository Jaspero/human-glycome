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
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {BROWSER_CONFIG} from '../../shared/consts/browser-config.const';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';
import {FullMembers} from '../../shared/interfaces/collections/full-members.interface';
import {AssociateMembers} from '../../shared/interfaces/collections/associate-members.interface';
import {AngularFirestore} from '@angular/fire/firestore';

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
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  @ViewChild('twitter')
  twitterEl: ElementRef;

  iterations: Array<{
    title: string;
    items: Array<{name: string; link: string}>;
  }> = [];
  currentIterationIndex = null;
  iterationTimer: any;
  fullMem$: Observable<FullMembers[]>;
  assMem$: Observable<AssociateMembers[]>;
  showFullMembers: boolean;

  ngOnInit() {
    if (BROWSER_CONFIG.isBrowser) {
      this.fullMem$ = this.afs
        .collection(FirestoreCollection.FullMembers, ref => {
          return ref.limit(5);
        })
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(action => ({
              id: action.payload.doc.id,
              ...(action.payload.doc.data() as any)
            }))
          ),
        );

      this.assMem$ = this.afs
        .collection(FirestoreCollection.AssMembers)
        .snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(action => ({
              id: action.payload.doc.id,
              ...(action.payload.doc.data() as any)
            }))
          }),
        );

      setInterval(() => {
        this.showFullMembers = !this.showFullMembers
      }, 60000);


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
