import { Component } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent {
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
