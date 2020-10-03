import {Injectable, Injector} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {BASE_TITLE} from '../consts/base-title.const';

@Injectable({
  providedIn: 'root'
})
export class MetaResolver implements Resolve<boolean> {
  constructor(
    private _title: Title,
    private _meta: Meta,
    private _injector: Injector
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let valuesToSet: {[key: string]: string};

    /**
     * If the meta comes with dependencies
     * then we know it was a function passed in
     */
    if (route.data.metaDeps) {
      valuesToSet = route.data.meta(
        route.data.metaDeps.map(dep => this._injector.get(dep))
      );
    } else {
      valuesToSet = route.data.meta || {};
    }

    this._title.setTitle(
      valuesToSet.title ? `${valuesToSet.title} - ${BASE_TITLE}` : BASE_TITLE
    );

    /**
     * To prevent iterating over the title and adding it as meta
     */
    delete valuesToSet.title;

    /**
     * Written like this instead of entries to support older browsers
     */
    Object.keys(valuesToSet).forEach(name => {
      this._meta.updateTag({name, content: valuesToSet[name]});
    });

    return true;
  }
}
