import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  ClickOutsideModule,
  EnumModule,
  FormTouchOnHoverModule,
  SanitizeModule,
  StopPropagationModule
} from '@jaspero/ng-helpers';
import {PostSnippetComponent} from './components/posts-snippet/post-snippet.component';
import {LibraryImageDirective} from './directives/library-image/library-image.directive';

const MODULES = [
  CommonModule,
  RouterModule,

  // https://github.com/Jaspero/ng-helpers
  FormTouchOnHoverModule,
  StopPropagationModule,
  ClickOutsideModule,
  EnumModule,
  SanitizeModule
];

const COMPONENTS = [PostSnippetComponent];

const DIRECTIVES = [LibraryImageDirective];

const PIPES = [];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES]
})
export class SharedModule {}
