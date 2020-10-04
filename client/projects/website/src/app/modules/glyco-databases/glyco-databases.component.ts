import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {GlycoDatabases} from '../../shared/interfaces/collections/glyco-databases.interface';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'hg-glyco-databases',
  templateUrl: './glyco-databases.component.html',
  styleUrls: ['./glyco-databases.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlycoDatabasesComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) {}

  glycoDatabases$: Observable<GlycoDatabases[]>;

  ngOnInit(): void {
    this.glycoDatabases$ = this.afs
      .collection(FirestoreCollection.GlycoDb)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => ({
            id: action.payload.doc.id,
            ...(action.payload.doc.data() as any)
          }))
        )
      );
  }

}
