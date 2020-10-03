import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {JasperoApiService} from '../services/jaspero-api/jaspero-api.service';
import {StateService} from '../services/state/state.service';

@Injectable({
  providedIn: 'root'
})
export class ItemGuard implements CanActivate {
  constructor(
    private _jasperoApi: JasperoApiService,
    private _state: StateService,
    private _router: Router
  ) {}

  static defaultQuery(route) {
    return JSON.stringify({id: route.params.id});
  }

  static defaultOnError(router: Router) {
    router.navigate(['/']);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data = next.data.itemGuard || {cache: 'id'};
    /**
     * Retrieve item from cache if a cache key was assigned
     * and the object exists in cache
     */
    if (
      data.cache &&
      this._state.getItemFromCache(data.collection, data.cache)
    ) {
      this._state.currentItem = this._state.getItemFromCache(
        data.collection,
        data.cache
      );
      return of(true);
    }

    const onError = data.onError || ItemGuard.defaultOnError;

    return this._jasperoApi
      .get(data.collection, {
        query: data.query ? data.query(next) : ItemGuard.defaultQuery(next)
      })
      .pipe(
        switchMap(res => {
          if (res.data.length) {
            this._state.currentItem = res.data[0];

            /**
             * Add item to cache if a cache key was assigned
             */
            if (data.cache) {
              this._state.addItemToCache(
                data.collection,
                res.data[0][data.cache],
                res.data[0]
              );
            }

            return of(true);
          } else {
            onError(this._router);
            return of(false);
          }
        }),
        catchError(() => {
          onError(this._router);
          return of(false);
        })
      );
  }
}
