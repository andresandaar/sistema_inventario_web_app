import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReceptionsRoutingModule } from './receptions-routing.module';
import { ReceptionsComponent } from './receptions.component';
import { ListReceptionComponent } from './pages/list-reception/list-reception.component';
import { NewReceptionComponent } from './pages/new-reception/new-reception.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ReceptionsComponent,
    ListReceptionComponent,
    NewReceptionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ReceptionsRoutingModule,
  ],
  providers: [
    DatePipe,
  ],
})
export class ReceptionsModule {}
