import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {Projects} from '../../shared/interfaces/collections/projects.interface';
import {JasperoApiService} from '../../shared/services/jaspero-api/jaspero-api.service';

@Component({
  selector: 'hg-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  constructor(
    private _jasperoApi: JasperoApiService,
    private _cdr: ChangeDetectorRef
  ) {}

  loading = true;
  categories$: Observable<Array<{category: string; projects: Projects[]}>>;

  ngOnInit() {
    this.categories$ = this._jasperoApi.get<Projects>('projects').pipe(
      map(res => {
        return res.data
          .reduce((acc, cur) => {
            const index = acc.findIndex(item => item.category === cur.category);

            if (index === -1) {
              acc.push({
                category: cur.category,
                projects: [cur]
              });
            } else {
              acc[index].projects.push(cur);
            }

            return acc;
          }, [])
          .sort((catOne, catTwo) => {
            const orderOne = parseInt(catOne.category.split(' ')[0], 10);
            const orderTwo = parseInt(catTwo.category.split(' ')[0], 10);
            return orderOne - orderTwo;
          });
      }),
      finalize(() => {
        this.loading = false;
        this._cdr.detectChanges();
      })
    );
  }
}
