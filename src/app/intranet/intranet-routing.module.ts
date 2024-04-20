import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './intranet.component';

const routes: Routes = [
  {
    path: '',
    component: IntranetComponent,
    children: [
      { path: '', redirectTo: 'supply-management', pathMatch: 'full' },
      {
        path: 'supply-management',
        loadChildren: () =>
          import('./supply-management/supply-management.module').then(
            (m) => m.SupplyManagementModule
          ),
      },
      {
        path: 'product-management',
        loadChildren: () =>
          import('./product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
      },
      {
        path: 'receptions',
        loadChildren: () =>
          import('./receptions/receptions.module').then(
            (m) => m.ReceptionsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
