import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RxDestroy} from '@jaspero/ng-helpers';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {AssociateMembers} from '../../shared/interfaces/collections/associate-members.interface';
import {FullMembers} from '../../shared/interfaces/collections/full-members.interface';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';
import {RxPipesService} from '../../shared/services/rx-pipes/rx-pipes.service';

@Component({
  selector: 'hg-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent extends RxDestroy implements OnInit {
  constructor(
    private _jasperoApi: JasperoApiService,
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder,
    private _rxPipes: RxPipesService
  ) {
    super();
  }

  fullMembers: FullMembers[] = [];
  associateMembers: AssociateMembers[] = [];
  loading = true;
  form: FormGroup;

  sentLoading$ = new BehaviorSubject(false);

  ngOnInit() {
    forkJoin(
      this._jasperoApi.get('full-members', {sort: {fullName: 1}}),
      this._jasperoApi.get('associate-members', {sort: {name: 1}})
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.fullMembers = res[0].data;
        this.associateMembers = res[1].data;
        this.loading = false;
        this._buildForm();
        this._cdr.detectChanges();
      });
  }

  send() {
    this.sentLoading$.next(true);

    const data = this.form.getRawValue();

    this._jasperoApi
      .insertOne('contact', {email: data.email, name: data.name})
      .pipe(
        this._rxPipes.showNotification({
          content: 'Submission sent. Thank you.',
          errorContent: 'An error occurred. Please try again later.'
        }),
        finalize(() => this.sentLoading$.next(false))
      )
      .subscribe(() => {
        this.form.reset();
      });
  }

  private _buildForm() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      permission: [false, Validators.requiredTrue]
    });
  }
}
