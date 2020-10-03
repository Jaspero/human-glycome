import {Injectable} from '@angular/core';
import {NotificationsService, NotificationType} from 'angular2-notifications';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

export interface ShowNotificationConfig {
  type?: NotificationType;
  title?: string;
  content?: string;
  errorContent?: string;
  errorTitle?: string;
  override?: any;
  showOnlyError?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RxPipesService {
  constructor(private _notificationsService: NotificationsService) {}

  /**
   * Shows a notification on next or throws
   * an error notification if the observable
   * throws an error
   */
  showNotification(
    config?: ShowNotificationConfig
  ): <T>(source$: Observable<T>) => Observable<T> {
    config = {
      /**
       * What type of notification to send on success
       */
      type: NotificationType.Success,
      title: 'Success',
      content: 'Action successful',
      errorTitle: 'Error',
      errorContent: 'There was an error with the request',
      showOnlyError: false,
      ...config
    };

    return <T>(source$: Observable<T>) => {
      return source$.pipe(
        tap(() => {
          if (!config.showOnlyError) {
            this._notificationsService[config.type](
              config.title,
              config.content,
              config.override
            );
          }
        }),
        catchError(err => {
          this._notificationsService.error(
            config.errorTitle,
            config.errorContent
          );
          return throwError(err);
        })
      );
    };
  }
}
