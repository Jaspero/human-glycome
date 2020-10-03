import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxDestroy} from '@jaspero/ng-helpers';
import {BehaviorSubject, forkJoin, from} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {AssociateMembers} from '../../shared/interfaces/collections/associate-members.interface';
import {FullMembers} from '../../shared/interfaces/collections/full-members.interface';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';
import {RxPipesService} from '../../shared/services/rx-pipes/rx-pipes.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';

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

  fullMembers: FullMembers[] = [];
  associateMembers: AssociateMembers[] = [];
  loading = true;
  form: FormGroup;

  sentLoading$ = new BehaviorSubject(false);

  ngOnInit() {
    /*forkJoin(
      this.jasperoApi.get('full-members', {sort: {fullName: 1}}),
      this.jasperoApi.get('associate-members', {sort: {name: 1}})
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.fullMembers = res[0].data;
        this.associateMembers = res[1].data;
        this.loading = false;
        this.buildForm();
        this.cdr.detectChanges();
      });*/

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      permission: [false, Validators.requiredTrue]
    });
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
