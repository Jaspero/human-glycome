import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Resources} from '../../../../shared/interfaces/collections/resources.interface';
import {StateService} from '../../../../shared/services/state/state.service';

@Component({
  selector: 'jaspero-single-resource',
  templateUrl: './single-resource.component.html',
  styleUrls: ['./single-resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleResourceComponent implements OnInit {
  constructor(private _stateService: StateService) {}

  resource: Resources;

  ngOnInit() {
    this.resource = this._stateService.currentItem;
  }
}
