import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '@core_shared/shared.module';



@NgModule({
  declarations: [PublicComponent],
  imports: [CommonModule, SharedModule, PublicRoutingModule],
})
export class PublicModule {}
