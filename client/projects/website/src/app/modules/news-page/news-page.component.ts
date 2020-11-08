import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {News} from '../../shared/interfaces/collections/news.interface';

@Component({
  selector: 'hg-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPageComponent implements OnInit {
  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute) {}

  @ViewChild('galleryDialog', {read: TemplateRef})
  galleryDialogTemplate: TemplateRef<any>;

  newsInfo: News;
  selectedImage: string;
  indexNumb: number;

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        map(({news}) => news),
      )
      .subscribe(item => {
        this.newsInfo = item;
      });
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
