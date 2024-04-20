import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetComponent } from './intranet.component';
import { SharedModule } from '@core_shared/shared.module';



@NgModule({
  declarations: [IntranetComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatSidenavModule,
    SharedModule,
    IntranetRoutingModule,
  ],
})
export class IntranetModule {}
