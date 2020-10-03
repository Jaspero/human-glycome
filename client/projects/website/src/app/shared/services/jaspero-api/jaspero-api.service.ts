import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {JasperoApiCacheContent} from '../../interfaces/jaspero-api/jaspero-api-cache-content.interface';
import {JasperoApiGetQueryOptions} from '../../interfaces/jaspero-api/jaspero-api-get-query-options.interface';
import {JasperoApiPaginatedQueryOptions} from '../../interfaces/jaspero-api/jaspero-api-paginated-query-options.interface';
import {JasperoApiPaginatedResponse} from '../../interfaces/jaspero-api/jaspero-api-paginated-response.interface';
import {JasperoApiProjection} from '../../interfaces/jaspero-api/jaspero-api-projection.interface';

@Injectable({
  providedIn: 'root'
})
export class JasperoApiService {
  constructor(private _http: HttpClient) {}

  static cache: Map<string, JasperoApiCacheContent> = new Map<
    string,
    JasperoApiCacheContent
  >();
  static inFlightObservables: Map<string, Subject<any>> = new Map<
    string,
    Subject<any>
  >();

  /**
   * Checks if a cache with the provided key
   * exists and that it isn't outdated
   */
  static validCache(key: string) {
    if (JasperoApiService.cache.has(key)) {
      if (JasperoApiService.cache.get(key).expires < Date.now()) {
        JasperoApiService.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  static notifyInFlightObservers(key: string, data: any) {
    if (JasperoApiService.inFlightObservables.has(key)) {
      const inFlight = JasperoApiService.inFlightObservables.get(key);

      /**
       * Notify listeners if there are any
       */
      if (inFlight.observers.length) {
        inFlight.next(data);
      }

      /**
       * Complete and remove the observable
       */
      inFlight.complete();

      JasperoApiService.inFlightObservables.delete(key);
    }
  }

  /**
   * Add an item to cache and remove it from the list
   * of in flight observers while also notifying all listeners
   */
  static setCache(key, data, cacheDuration) {
    JasperoApiService.cache.set(key, {
      data,
      expires: Date.now() + cacheDuration
    });
    JasperoApiService.notifyInFlightObservers(key, data);
  }

  /**
   * Retrieve item from cache or an in flight observable
   * if a duration value was provided and is truthy
   */
  static getFromCache<T = any>(
    key: string,
    fallback: Observable<any>,
    duration?: number
  ): Observable<T> {
    if (duration) {
      if (JasperoApiService.validCache(key)) {
        return of(JasperoApiService.cache.get(key).data);
      }

      if (this.inFlightObservables.has(key)) {
        return this.inFlightObservables.get(key);
      } else {
        this.inFlightObservables.set(key, new Subject());
        return fallback.pipe(tap(data => this.setCache(key, data, duration)));
      }
    } else {
      return fallback;
    }
  }

  /**
   * Parse an object in to valid format
   * for HttpClient query params
   */
  static parseQuery(obj: Object) {
    return Object.keys(obj).reduce((acc, cur) => {
      if (typeof obj[cur] === 'object') {
        try {
          acc[cur] = JSON.stringify(obj[cur]);
        } catch (e) {
          acc[cur] = obj[cur];
        }
      } else {
        acc[cur] = obj[cur];
      }

      return acc;
    }, {});
  }

  get<T = any>(
    collection: string,
    options: JasperoApiGetQueryOptions = {},
    cache = 0
  ) {
    const key = JSON.stringify({collection, options, method: 'postQuery'});

    return JasperoApiService.getFromCache<{success: boolean; data: T[]}>(
      key,
      this._http.get<{success: boolean; data: T[]}>(collection, {
        params: JasperoApiService.parseQuery(options)
      }),
      cache
    );
  }

  queryViaPost<T = any>(
    collection: string,
    options: JasperoApiGetQueryOptions = {},
    cache = 0
  ) {
    const key = JSON.stringify({collection, options, method: 'postQuery'});

    return JasperoApiService.getFromCache<{success: boolean; data: T[]}>(
      key,
      this._http.post<{success: boolean; data: T[]}>(collection, options),
      cache
    );
  }

  getSingle<T = any>(
    collection: string,
    id: string,
    projection: JasperoApiProjection = {},
    populate = false,
    cache = 0
  ) {
    const key = JSON.stringify({
      collection,
      id,
      projection,
      populate,
      method: 'getSingle'
    });

    return JasperoApiService.getFromCache<{success: boolean; data: T}>(
      key,
      this._http.get<{success: boolean; data: T}>(`${collection}/${id}`, {
        params: {
          ...(projection ? {projection: JSON.stringify(projection)} : {}),
          ...(populate || populate === false
            ? {populate: populate.toString()}
            : {})
        }
      }),
      cache
    );
  }

  paginated<T = any>(
    collection: string,
    options: JasperoApiPaginatedQueryOptions = {},
    cache = 0
  ) {
    const key = JSON.stringify({collection, options, method: 'postPaginated'});

    return JasperoApiService.getFromCache<JasperoApiPaginatedResponse<T>>(
      key,
      this._http.post<JasperoApiPaginatedResponse<T>>(
        `${collection}/paginated`,
        options
      ),
      cache
    );
  }

  insertOne<T = any>(collection: string, data: any) {
    return this._http.post<{success: boolean; data: T}>(
      `${collection}/create`,
      data
    );
  }

  insertMany<T = any>(collection: string, data: any[]) {
    return this._http.post<{success: boolean; data: T[]}>(
      `${collection}/create-many`,
      data
    );
  }

  updateOne(collection: string, query: any, data: any) {
    return this._http.put<{success: boolean; data: Object}>(collection, {
      query,
      data
    });
  }

  updateMany(collection: string, query: any, data: any) {}

  remove(collection: string, query: any) {
    return this._http.delete(collection, query) as any;
  }

  removeMany(collection: string, query: any) {
    return this._http.delete(`${collection}/many`, query) as any;
  }
}
