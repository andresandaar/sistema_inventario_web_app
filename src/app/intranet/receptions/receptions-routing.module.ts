import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionsComponent } from './receptions.component';
import { ListReceptionComponent } from './pages/list-reception/list-reception.component';
import { NewReceptionComponent } from './pages/new-reception/new-reception.component';
const routes: Routes = [
  {
    path: '',
    component: ReceptionsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ListReceptionComponent,
      },
      {
        path: 'edit/:id',
        component: NewReceptionComponent,
      },
      {
        path: 'new',
        component: NewReceptionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionsRoutingModule { }
