import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DbService as FDbService, FormBuilderModule, ROLE, STORAGE_URL, StorageService} from '@jaspero/form-builder';
import {LoadClickModule, SanitizeModule} from '@jaspero/ng-helpers';
import {FirebaseModule} from '../../integrations/firebase/fb.module';
import {FUNCTIONS_REGION} from '../../integrations/firebase/functions-region.token';
import {ENV_CONFIG} from '../env-config';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ELEMENTS} from './elements/elements.const';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {ModuleInstanceComponent} from './modules/dashboard/modules/module-instance/module-instance.component';
import {InstanceOverviewComponent} from './modules/dashboard/modules/module-instance/pages/instance-overview/instance-overview.component';
import {InstanceSingleComponent} from './modules/dashboard/modules/module-instance/pages/instance-single/instance-single.component';
import {ConfirmationComponent} from './shared/components/confirmation/confirmation.component';
import {MathPipe} from './shared/pipes/math/math-pipe.';
import {ParseTemplatePipe} from './shared/pipes/parse-template/parse-template.pipe';
import {DbService} from './shared/services/db/db.service';
import {StateService} from './shared/services/state/state.service';
import {appInit} from './shared/utils/app-init';
import {TranslocoRootModule} from './transloco-root.module';

export function init(injector: Injector) {
  return () => {
    return appInit(injector);
  };
}

const PAGES = [
  ModuleInstanceComponent,
  InstanceSingleComponent,
  InstanceOverviewComponent,
  DashboardComponent
];

const COMPONENTS = [];

const ENTRY_COMPONENTS = [
  ConfirmationComponent
];

const DIRECTIVES = [];

const PIPES = [
  MathPipe,
  ParseTemplatePipe
];

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    ...COMPONENTS,
    ...ENTRY_COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...ELEMENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
    ...ELEMENTS
  ],
  imports: [
    /**
     * Replace with another implementation
     * if necessary
     */
    FirebaseModule.forRoot(),

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    PortalModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    DragDropModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatProgressBarModule,

    // Ng Helpers
    LoadClickModule,
    SanitizeModule,
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-US'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [Injector],
      multi: true
    },
    {
      provide: FUNCTIONS_REGION,
      useValue: 'us-central1'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
