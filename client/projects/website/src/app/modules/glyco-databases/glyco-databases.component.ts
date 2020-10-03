import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {GlycoDatabases} from '../../shared/interfaces/collections/glyco-databases.interface';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';

@Component({
  selector: 'hg-glyco-databases',
  templateUrl: './glyco-databases.component.html',
  styleUrls: ['./glyco-databases.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlycoDatabasesComponent implements OnInit {
  constructor(
    private _jasperoApi: JasperoApiService,
    private _cdr: ChangeDetectorRef
  ) {}

  loading = true;
  glycoDatabases$: Observable<GlycoDatabases[]>;

  ngOnInit() {
    this.glycoDatabases$ = this._jasperoApi
      .get<GlycoDatabases>('glyco-databases')
      .pipe(
        map(res => res.data),
        finalize(() => {
          this.loading = false;
          this._cdr.detectChanges();
        })
      );
  }
}
