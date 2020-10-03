import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {ImageSizeModification} from '../../shared/classes/image-modifications/image-size-modification.class';
import {ObjectIdHelper} from '../../shared/helpers/object-id.helper';
import {News} from '../../shared/interfaces/collections/news.interface';
import {StateService} from '../../shared/services/state/state.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'jaspero-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent implements OnInit {
  constructor(private _state: StateService, public dialog: MatDialog) {}

  @ViewChild('galleryDialog', {read: TemplateRef})
  galleryDialogTemplate: TemplateRef<any>;

  imageModifications = [new ImageSizeModification(480)];
  newsInfo: News;
  selectedImage: string;
  indexNumb: number;

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.newsInfo = this._state.currentItem;
    this.newsInfo['createdAt'] = ObjectIdHelper.dateFromId(this.newsInfo._id);
  }

  change(direction) {
    if (direction === 'left') {
      if (this.indexNumb === 0) {
        this.indexNumb = this.newsInfo.gallery.length - 1;
      } else {
        this.indexNumb--;
      }
    } else {
      if (this.indexNumb === this.newsInfo.gallery.length - 1) {
        this.indexNumb = 0;
      } else {
        this.indexNumb++;
      }
    }
    this.selectedImage = this.newsInfo.gallery[this.indexNumb];
  }

  openDialog(ind: number) {
    this.indexNumb = ind;
    this.selectedImage = this.newsInfo.gallery[this.indexNumb];
    this.dialog.open(this.galleryDialogTemplate, {
      width: '1000px'
    });
  }
}
