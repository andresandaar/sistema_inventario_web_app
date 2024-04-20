import { Component } from '@angular/core';

@Component({
  selector: 'app-receptions',
  templateUrl: './receptions.component.html',
  styleUrls: ['./receptions.component.scss'],
})
export class ReceptionsComponent {
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
