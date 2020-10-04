import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';
import {AngularFirestore} from '@angular/fire/firestore';

interface StrippedResource {
  name: string;
  url: string;
}

@Component({
  selector: 'hg-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent implements OnInit {
  constructor(private afs: AngularFirestore) {}

  loading = true;
  resources$: Observable<StrippedResource[]>;

  ngOnInit(): void {
    this.resources$ = this.afs
      .collection(FirestoreCollection.Resources)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => ({
            id: action.payload.doc.id,
            ...(action.payload.doc.data() as any)
          }))
        ),
        finalize(() => {
          this.loading = false;
        })
      );
  }
}
