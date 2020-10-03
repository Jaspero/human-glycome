import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {GlycoDatabasesComponent} from './glyco-databases.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,

    // External
    MatProgressSpinnerModule,

    RouterModule.forChild([
      {
        path: '',
        component: GlycoDatabasesComponent,
        data: {
          meta: {
            title: 'Glyco Databases',
            description: `A list of the glyco-databases endorsed by the Human Glycome Project.`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [GlycoDatabasesComponent]
})
export class GlycoDatabasesModule {}
