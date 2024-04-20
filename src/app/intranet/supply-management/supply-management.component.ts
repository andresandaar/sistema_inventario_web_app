import { Component } from '@angular/core';

@Component({
  selector: 'app-supply-management',
  templateUrl: './supply-management.component.html',
  styleUrls: ['./supply-management.component.scss'],
})
export class SupplyManagementComponent {
  public tabItems: any = [
    {
      label: 'Listar',
      icon: 'add',
      url: 'list',
    },
    {
      label: 'Crear',
      icon: 'collections_bookmark',
      url: 'new',
    },
  ];

  public activeLink: String = this.tabItems[0].label;
}
