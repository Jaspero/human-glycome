import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module')
        .then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module')
        .then(m => m.AboutModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./modules/news-page/news-page.module')
        .then(m => m.NewsPageModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/projects/projects.module')
        .then(m => m.ProjectsModule),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./modules/resources/resources.module')
        .then(m => m.ResourcesModule),
  },
  {
    path: 'glyco-databases',
      loadChildren: () =>
      import('./modules/glyco-databases/glyco-databases.module')
        .then(m => m.GlycoDatabasesModule),
  },
  {
    path: 'education',
    loadChildren: () =>
      import('./modules/education/education.module')
        .then(m => m.EducationModule),
  },
  {
    path: 'members',
    loadChildren: () =>
      import('./modules/members/members.module')
        .then(m => m.MembersModule),
  },
  {
    path: 'privacy-policy',
      loadChildren: () =>
      import('./modules/privacy-policy/privacy-policy.module')
        .then(m => m.PrivacyPolicyModule),
  },
  {
    path: '404',
      loadChildren: () =>
      import('./modules/page-not-found/page-not-found.module')
        .then(m => m.PageNotFoundModule),
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
