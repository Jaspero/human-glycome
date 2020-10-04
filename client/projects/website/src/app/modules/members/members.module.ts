import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {MetaResolver} from '../../shared/resolvers/meta.resolver';
import {MembersComponent} from './members.component';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LoadClickModule} from '@jaspero/ng-helpers';

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,

    // External
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    LoadClickModule,

    RouterModule.forChild([
      {
        path: '',
        component: MembersComponent,
        data: {
          meta: {
            title: 'Members',
            description:
              // tslint:disable-next-line
              `A list of the full members and associate members of the Human Glycome Project, requirements for membership and a mailing list.`
          }
        },
        resolve: {
          meta: MetaResolver
        }
      }
    ])
  ],
  declarations: [MembersComponent]
})
export class MembersModule {}
