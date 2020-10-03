import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional
} from '@angular/core';
import {RESPONSE} from '@nguniversal/express-engine/tokens';
import {Response} from 'express';
import {BROWSER_CONFIG} from '../../shared/consts/browser-config.const';

@Component({
  selector: 'jaspero-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    @Optional()
    @Inject(RESPONSE)
    private response: Response
  ) {}

  ngOnInit() {
    if (!BROWSER_CONFIG.isBrowser) {
      this.response.status(404);
    }
  }
}
