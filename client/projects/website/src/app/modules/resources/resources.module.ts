import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {StateService} from '../../shared/services/state/state.service';
import {SharedModule} from '../../shared/shared.module';
import {SingleResourceComponent} from './components/single-resource/single-resource.component';
import {ResourcesComponent} from './resources.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ResourcesResolver} from './resolver/resources.resolver';

export function guardQuery(route) {
  return {url: route.params.url};
}

/*export function resourceMeta([state]: [StateService]) {
  return {
    title: state.currentItem.meta.title,
    description: state.currentItem.meta.description
  };
}*/

@NgModule({
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResourcesComponent,
        data: {
          meta: {
            title: 'Resources',
            description:
              // tslint:disable-next-line
              `A list of the resources and services pledged by the associate members of the Human Glycome Project (HGP) are available to all full members of the HGP.`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      },
      {
        path: ':url',
        component: SingleResourceComponent,
        data: {
/*
          meta: resourceMeta,
*/
          metaDeps: [StateService]
        },
        resolve: {
          resources: ResourcesResolver,
          /*meta: MetaResolver*/
        }
      }
    ])
  ],
  declarations: [ResourcesComponent, SingleResourceComponent],
  providers: [ResourcesResolver]
})
export class ResourcesModule {}
