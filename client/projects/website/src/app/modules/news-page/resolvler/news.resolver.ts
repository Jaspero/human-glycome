import {FirestoreCollection} from '../../../shared/enums/firestore-collection.enum';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {catchError, map, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Injectable} from '@angular/core';
import {News} from '../../../shared/interfaces/collections/news.interface';

@Injectable()
export class NewsResolver implements Resolve<News> {
  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route);
    return this.afs
      .doc(FirestoreCollection.News + '/' + route.params.url)
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
