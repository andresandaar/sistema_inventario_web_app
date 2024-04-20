import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() OnOptionItem: EventEmitter<boolean> = new EventEmitter<boolean>();

  public sidebarItemsAuth = [
    {
      label: 'Proveedores',
      icon: 'supervisor_account',
      url: 'supply-management/list',
    },
    {
      label: 'Productos',
      icon: 'collections_bookmark',
      url: 'product-management/list',
    },
    {
      label: 'Recepciones',
      icon: 'assignment',
      url: 'receptions/list',
    },
  ];

  optionItem() {
    this.OnOptionItem.emit(true);
  }
}
