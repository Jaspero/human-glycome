import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {ItemGuard} from '../../shared/guards/item.guard';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {StateService} from '../../shared/services/state/state.service';
import {SharedModule} from '../../shared/shared.module';
import {guardQuery} from '../resources/resources.module';
import {NewsPageComponent} from './news-page.component';

export function newsMeta([state]: [StateService]) {
  return {
    title: state.currentItem.title,
    description: state.currentItem.shortDescription
  };
}

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: ':url',
        component: NewsPageComponent,
        canActivate: [ItemGuard],
        data: {
          itemGuard: {
            collection: 'news',
            cache: 'url',
            query: guardQuery
          },
          meta: newsMeta,
          metaDeps: [StateService]
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [NewsPageComponent]
})
export class NewsPageModule {}
