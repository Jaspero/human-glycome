import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private _router: Router) {}

  /**
   * Holds any previously loaded items
   */
  protected itemCache: {[key: string]: Object} = {};

  /**
   * Holds the value of anything that
   * was last resolved by the ItemGuard
   */
  currentItem: any;
  /**
   * Holds state information for all
   * previously loaded routes
   */
  routerData: any = {};

  /**
   * Stores any arbitrary information
   * that will be associated with the
   * current route
   */
  setRouteData(data: any) {
    const url = this._router.routerState.snapshot.url;

    this.routerData[url] = data;
  }

  /**
   * Retrieves previously stored route data
   * for the current route
   */
  getRouterData(
    defaultData = {
      sortDirection: 'desc',
      sortActive: '_id',
      pageIndex: 0,
      pageSize: 10
    }
  ) {
    const url = this._router.routerState.snapshot.url;

    if (this.routerData[url]) {
      return this.routerData[url];
    } else {
      return defaultData;
    }
  }

  addItemToCache(collection: string, property: string | number, item: Object) {
    if (!this.itemCache[collection]) {
      this.itemCache[collection] = {[property]: item};
    } else {
      this.itemCache[collection][property] = item;
    }
  }

  getItemFromCache(collection: string, property: string | number) {
    if (this.itemCache[collection] && this.itemCache[collection][property]) {
      return this.itemCache[collection][property];
    } else {
      return null;
    }
  }
}
