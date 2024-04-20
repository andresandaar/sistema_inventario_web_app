import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyManagementRoutingModule } from './supply-management-routing.module';
import { SupplyManagementComponent } from './supply-management.component';
import { ListSupplierComponent } from './pages/list-supplier/list-supplier.component';
import { NewSupplyComponent } from './pages/new-supply/new-supply.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SupplyManagementComponent,
    ListSupplierComponent,
    NewSupplyComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SupplyManagementRoutingModule,
  ],
})
export class SupplyManagementModule {}
