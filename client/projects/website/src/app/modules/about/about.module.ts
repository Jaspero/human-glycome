import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {AboutComponent} from './about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
        data: {
          meta: {
            title: 'About Us',
            description:
              // tslint:disable-next-line
              `The Human Glycome Project (HGP) is led by a consortium of research groups in the field of glycoscience with the shared vision that in-depth understanding of the effect that glycans have on the structure and function of proteins, lipids and polysaccharides will provide a profound understanding of their role in the pathogenicity of diseases.`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [AboutComponent]
})
export class AboutModule {}
