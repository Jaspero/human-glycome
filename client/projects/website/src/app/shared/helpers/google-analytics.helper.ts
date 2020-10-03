import {environment} from '../../../environments/environment';
import {AnalyticsAction} from '../enums/analytics-action.enum';
import {AnalyticsCategory} from '../enums/analytics-category.enum';

declare const ga: any;
declare const window: any;

export class GoogleAnalyticsHelper {
  static initialize(key: string) {
    window.ga =
      window.ga ||
      function() {
        (ga.q = ga.q || []).push(arguments);
      };

    ga.l = +new Date();
    ga('create', key, 'auto');
  }

  static pageChange(url: string) {
    if (environment.initAnalytics) {
      ga('set', 'page', url);
      ga('send', 'pageview');
    }
  }

  static event(
    category: AnalyticsCategory,
    action: AnalyticsAction = AnalyticsAction.Click,
    label?: string,
    value?: number
  ) {
    if (environment.initAnalytics) {
      const event: any = {
        hitType: 'event',
        eventCategory: category,
        eventAction: action
      };

      if (label) {
        event.eventLabel = label;
      }

      if (value) {
        event.eventValue = value;
      }

      ga('send', event);
    }
  }
}
