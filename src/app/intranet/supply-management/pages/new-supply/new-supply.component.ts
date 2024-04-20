import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Supply, TipoIdentificacion } from '../../interfaces/supply.interface';
import { SupplyService } from '../../services/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-new-supply',
  templateUrl: './new-supply.component.html',
  styleUrls: ['./new-supply.component.scss'],
})
export class NewSupplyComponent {

  public supplyForm = new FormGroup({
    tipo_identificacion: new FormControl<TipoIdentificacion>(
      TipoIdentificacion.Cedula
    ),
    numero_identificacion: new FormControl<string>(''),
    nombre_razon_social: new FormControl<string>(''),
    direccion: new FormControl<string>(''),
    nombre_contacto: new FormControl<string>(''),
    celular_contacto: new FormControl<string>(''),
  });

  public currentId: string = '';

  public tipoIdentificacion = [
    {
      id: 'Cedula',
      name: 'Cedula',
    },
    {
      id: 'NIT',
      name: 'NIT',
    },
    {
      id: 'Cedula_de_extranjeria',
      name: 'Cedula de Extranjería',
    },
    {
      id: 'NIT_de_extranjeria',
      name: 'NIT de Extranjería',
    },
  ];

  constructor(
    private supplyService: SupplyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.currentId = id;
          return this.supplyService.getSupplyById(id);
        })
      )
      .subscribe((supply) => {
        if (!supply)
          return this.router.navigateByUrl('intranet/supply-management');
        this.supplyForm.reset(supply);
        return;
      });
  };

  onSubmit() {
    if (this.supplyForm.invalid) return;

    if (this.currentId) {
      this.supplyService
        .updateSupply(this.currentSupply, this.currentId)
        .subscribe((supply) => {
          this.showSnackbar(`${supply.nombre_contacto}, update!`);
          this.router.navigateByUrl('intranet/supply-management');
        });
      return;
    }

    this.supplyService.addSupply(this.currentSupply).subscribe((supply) => {
      this.router.navigateByUrl('intranet/supply-management');
      this.showSnackbar(`${supply.nombre_contacto}, created!`);
    });
  }

  OnDeleteSupply() {
    if (!this.currentId) throw new Error('Supply id is required');
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.currentSupply,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.supplyService.deleteSupplyById(this.currentId)),
        filter((result: boolean) => result)
      )
      .subscribe(() => this.router.navigateByUrl('intranet/supply-management'));
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
  
  get currentSupply(): Supply {
    const supply = this.supplyForm.value as Supply;
    return supply;
  }
}
