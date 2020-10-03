import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor() {}

  reqCache = {};

  /**
   * If a token is defined, it will be attached
   * to every request going to the apiUrl
   */
  token: string;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const clone = req.clone({
      /**
       * Apply apiUrl if the request url is a shorthand
       * (doesn't contain 'http' in the url). If it's not
       * a shorthand we assume it doesn't use our API
       */
      url: req.url.includes('http') ? req.url : environment.apiUrl + req.url,

      /**
       * If a token is attached and the url isn't external
       */
      ...(this.token && !req.url.includes('http')
        ? {setHeaders: {token: this.token}}
        : {})
    });

    if (clone.method === 'GET' && this.reqCache[clone.urlWithParams]) {
      return of(this.reqCache[clone.urlWithParams]);
    }

    return next.handle(clone).pipe(
      map(response => {
        if (response instanceof HttpResponse && clone.method === 'GET') {
          this.reqCache[clone.urlWithParams] = response.clone();
        }

        return response;
      })
    );
  }
}
