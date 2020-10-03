import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {SharedModule} from '../../shared/shared.module';
import {NewsComponent} from './components/news/news.component';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: {
          meta: {
            title: '',
            description:
              // tslint:disable-next-line
              `Glycans are involved in the pathophysiology of every major disease, so Human Glycome Project (HGP) aims to address this societal problem by providing a platform for approachable resources, education, and services available to every glycobiologist and glyco-focused researcher collecting additional knowledge about the structure and function of human glycoconjugates.`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [HomeComponent, NewsComponent]
})
export class HomeModule {}
