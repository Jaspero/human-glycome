import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SanitizeModule} from '@jaspero/ng-helpers';
import {log} from 'util';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {StateService} from '../../shared/services/state/state.service';
import {EducationComponent} from './education.component';
import {EducationSinglePageComponent} from './single-page/education-single-page.component';
import {EducationResolver} from './resolver/education.resolver';

/*export function educationMeta([state]: [StateService]) {
  return {
    title: state.currentItem.title,
    description: state.currentItem.shortDescription
  };
}*/

const routes: Routes = [
  {
    path: '',
    component: EducationComponent,
    data: {
      meta: {
        title: 'Education',
        description: `Educational videos, sites, and blogs endorsed by the Human Glycome Project.`
      }
    },
    resolve: {
      meta: MetaResolver
    }
  },
  {
    path: ':_id',
    component: EducationSinglePageComponent,
    /*        data: {
              meta: educationMeta
            },*/
    resolve: {
      meta: MetaResolver,
      education: EducationResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SanitizeModule
  ],
  declarations: [EducationComponent, EducationSinglePageComponent]
})
export class EducationModule {}
