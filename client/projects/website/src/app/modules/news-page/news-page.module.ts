import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, Routes} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {StateService} from '../../shared/services/state/state.service';
import {SharedModule} from '../../shared/shared.module';
import {NewsPageComponent} from './news-page.component';
import {NewsResolver} from './resolvler/news.resolver';

export function newsMeta([state]: [StateService]) {
  return {
    title: state.currentItem.title,
    description: state.currentItem.shortDescription
  };
}

const routes: Routes = [
  {
    path: ':url',
    component: NewsPageComponent,
    /*data: {
      meta: newsMeta,
      metaDeps: [StateService]
    },*/
    resolve: {
      meta: MetaResolver,
      news: NewsResolver
    }
  }
]

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsPageComponent],
  providers: [NewsResolver]
})
export class NewsPageModule {}
