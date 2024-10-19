import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/side-login',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./pages/forms/forms.module').then((m) => m.FormModule),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts/charts.module').then((m) => m.ChartsModule),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./pages/tables/tables.module').then((m) => m.TablesModule),
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'store',
        loadChildren: () =>
          import('./pages/chatbot/chatbot.module').then((m) => m.ChatbotModule),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
      {
        path: 'theme-pages',
        loadChildren: () =>
          import('./pages/theme-pages/theme-pages.module').then(
            (m) => m.ThemePagesModule
          ),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'seller'] },
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'landingpage',
        loadChildren: () =>
          import('./pages/theme-pages/landingpage/landingpage.module').then(
            (m) => m.LandingPageModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
