import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from '@core_shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },

  {
    path: 'intranet',
    loadChildren: () =>
      import('./intranet/intranet.module').then((m) => m.IntranetModule)
  },

  {
    path: '404',
    component: Error404PageComponent,
  },

  { path: '**', component: Error404PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
