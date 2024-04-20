import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { Reception } from '../../interfaces/reception.interface';
import { ReceptionService } from '../../services/reception.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-reception',
  templateUrl: './list-reception.component.html',
  styleUrls: ['./list-reception.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListReceptionComponent {
  public columnsToDisplay = ['fecha_hora', 'numero_factura', 'proveedor'];

  public columnsToDisplayWithExpand = [
    ...this.columnsToDisplay,
    'expand',
    'acciones',
  ];

  public expandedElement: null | undefined;

  constructor(
    private router: Router,
    private receptionService: ReceptionService,
    private matDialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'cantidad',
    'lote',
    'registro_invima',
    'fecha_vencimiento',
    'estado_presentacion_producto',
    'producto',
  ];

  public reception: Reception[] = [];

  ngOnInit(): void {
    this.getReception();
  }

  getReception() {
    this.receptionService.getReception().subscribe((reception: Reception[]) => {
      this.reception = reception;
      console.log(this.reception);
    });
  }

  navigate(id: any) {
    //this.router.navigate(['intranet/supply-management/edit', id]);
  }

  OnDeleteReception(id: any, numero_factura: string) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {  numero_factura },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.receptionService.deleteReceptionById(id)),
        filter((result: boolean) => result)
      )
      .subscribe(() => this.getReception());
  }
}
