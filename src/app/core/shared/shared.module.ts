import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    NavBarComponent,
    SidebarComponent
  ],
  exports: [
    Error404PageComponent,
    NavBarComponent,
    SidebarComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class SharedModule {}
