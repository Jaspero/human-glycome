import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found.component';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageNotFoundComponent,
        data: {
          meta: {
            title: 'Page not found',
            description: `The page you are looking for doesn't exist`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
