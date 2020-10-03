import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {StateService} from '../../services/state/state.service';

@Component({
  selector: 'hg-post-snippet',
  templateUrl: './post-snippet.component.html',
  styleUrls: ['./post-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostSnippetComponent implements OnInit {
  constructor(public state: StateService) {}

  @Input()
  item: any;

  ngOnInit() {
    // todo: get posts with pagination
  }
}
