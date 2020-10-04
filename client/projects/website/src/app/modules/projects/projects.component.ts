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
import {FirestoreCollection} from '../../shared/enums/firestore-collection.enum';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'hg-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private cdr: ChangeDetectorRef
  ) {}

  loading = true;
  categories$: Observable<Array<{category: string; projects: Projects[]}>>;

  ngOnInit() {
    this.categories$ = this.afs
      .collection(FirestoreCollection.Projects)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => ({
            id: action.payload.doc.id,
            ...(action.payload.doc.data() as any)
          })).reduce((acc, cur) => {
            const index = acc.findIndex(item => item.category === cur.category);

            if (index === -1) {
              acc.push({
                category: cur.category,
                projects: [cur]
              });
            } else {
              acc[index].projects.push(cur);
            }
            this.loading = false;
            return acc;
          }, [])
        )
      );
  }
}
