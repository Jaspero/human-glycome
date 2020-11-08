import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxDestroy} from '@jaspero/ng-helpers';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';
import {AssociateMembers} from '../../shared/interfaces/collections/associate-members.interface';
import {FullMembers} from '../../shared/interfaces/collections/full-members.interface';
import {RxPipesService} from '../../shared/services/rx-pipes/rx-pipes.service';

@Component({
  selector: 'hg-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent extends RxDestroy implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private rxPipes: RxPipesService
  ) {
    super();
  }

  fullMembers$: Observable<FullMembers[]>;
  associateMembers$: Observable<AssociateMembers[]>;
  loading = true;
  form: FormGroup;

  sentLoading$ = new BehaviorSubject(false);

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      permission: [false, Validators.requiredTrue]
    });

    this.fullMembers$ = this.afs
      .collection(FirestoreCollection.FullMembers)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => ({
            id: action.payload.doc.id,
            ...(action.payload.doc.data() as any)
          }))
        )
      );

    this.associateMembers$ = this.afs
      .collection(FirestoreCollection.AssMembers)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => ({
            id: action.payload.doc.id,
            ...(action.payload.doc.data() as any)
          }))
        ),
      );

  }

  send() {
    return() => {
      const {name, email, permission} = this.form.getRawValue();
      return from(
        this.afs.collection(FirestoreCollection.Contact).add({name, email, permission})
      ).pipe(
        this.rxPipes.showNotification({
          content: 'Submission sent. Thank you.',
          errorContent: 'An error occurred. Please try again later.'
        }),
        finalize(() => this.sentLoading$.next(false))
      );
    };
  }
}
