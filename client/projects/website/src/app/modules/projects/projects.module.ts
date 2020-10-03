import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {ProjectsComponent} from './projects.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,

    // External
    MatProgressSpinnerModule,

    RouterModule.forChild([
      {
        path: '',
        component: ProjectsComponent,
        data: {
          meta: {
            title: 'Projects',
            description:
              // tslint:disable-next-line
              `Individual projects of the Human Glycome Project (HGP) can be divided in to five sections: 1) Diversity of the human glycome 2) Inter-individual variability of the human body fluid glycome 3) Inter-individual variability of the human tissue glycome 4) Functional relevance and the regulation of the human glycome 5) Analytical methods and standards for Glycoscience.`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule {}
