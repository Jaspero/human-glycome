import {FirestoreCollection} from '../../../shared/enums/firestore-collection.enum';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {catchError, map, take} from 'rxjs/operators';
import {queue, throwError} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {Education} from '../../../shared/interfaces/education/education-interface';

@Injectable()
export class EducationResolver implements Resolve<Education> {
  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.afs
      .doc(FirestoreCollection.Education + '/' + route.params.id)
      .valueChanges()
      .pipe(
        take(1),
        map((value: any) => ({
          ...value,
          id: route.params.id
        })),
        catchError(error => {
          this.router.navigate(['/404']);
          return throwError(error);
        })
      );
  }
}
