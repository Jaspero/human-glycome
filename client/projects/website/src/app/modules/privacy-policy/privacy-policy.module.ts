import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {PrivacyPolicyComponent} from './privacy-policy.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivacyPolicyComponent,
        data: {
          meta: {
            title: 'Privacy Policy',
            description: 'Our privacy policy'
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [PrivacyPolicyComponent]
})
export class PrivacyPolicyModule {}
