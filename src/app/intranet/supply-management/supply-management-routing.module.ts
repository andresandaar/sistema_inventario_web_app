import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSupplierComponent } from './pages/list-supplier/list-supplier.component';
import { SupplyManagementComponent } from './supply-management.component';
import { NewSupplyComponent } from './pages/new-supply/new-supply.component';


const routes: Routes = [
  {
    path: '',
    component: SupplyManagementComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ListSupplierComponent,
      },
      {
        path: 'edit/:id',
        component: NewSupplyComponent,
      },
      {
        path: 'new',
        component: NewSupplyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyManagementRoutingModule { }
