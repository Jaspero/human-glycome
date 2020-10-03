import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BROWSER_CONFIG} from './shared/consts/browser-config.const';
import {environment} from '../environments/environment';
import {GoogleAnalyticsHelper} from './shared/helpers/google-analytics.helper';
import {filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'hg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  sideMenu = false;

  /**
   * Useful for showing backgrounds in css
   */
  @HostBinding('class.webp')
  webpSupported = BROWSER_CONFIG.webpSupported;

  ngOnInit() {
    if (environment.initAnalytics && BROWSER_CONFIG.isBrowser) {
      GoogleAnalyticsHelper.initialize(environment.googleAnalyticsKey);
    }

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(route => {
          if (BROWSER_CONFIG.isBrowser) {
            GoogleAnalyticsHelper.pageChange(route['url']);
          }
        }),
        map(() => this.activateRoute)
      )
      .subscribe(route => {});
  }
}
