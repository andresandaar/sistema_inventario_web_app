import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Supply } from '../../interfaces/supply.interface';
import { SupplyService } from '../../services/supply.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss'],
})
export class ListSupplierComponent {

  displayedColumns: string[] = [
    'tipo_identidicacion',
    'numero_identificacion',
    'nombre_razon_social',
    'direccion',
    'nombre_contacto',
    'celular_contacto',
    'acciones',
  ];

  public supplys: Supply[] = [];

  constructor(
    private router: Router,
    private supplyService: SupplyService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSupplys();
  }

  getSupplys() {
    this.supplyService.getSupply().subscribe((supplys: Supply[]) => {
      this.supplys = supplys;
    });
  }

  navigate(id: any) {
    this.router.navigate(['intranet/supply-management/edit', id]);
  }

  OnDeleteSupply(id: any, nombre: string) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: { nombre: nombre },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.supplyService.deleteSupplyById(id)),
        filter((result: boolean) => result)
      )
      .subscribe(() => this.getSupplys());
  }
}
