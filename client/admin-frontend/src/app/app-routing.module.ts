import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./pages/forms/forms.module').then((m) => m.FormModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./pages/charts/charts.module').then((m) => m.ChartsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./pages/apps/apps.module').then((m) => m.AppsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./pages/widgets/widgets.module').then((m) => m.WidgetsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./pages/tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'chatbot',
        loadChildren: () =>
          import('./pages/chatbot/chatbot.module').then((m) => m.ChatbotModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'theme-pages',
        loadChildren: () =>
          import('./pages/theme-pages/theme-pages.module').then(
            (m) => m.ThemePagesModule
          ),
        canActivate: [AuthGuard],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
