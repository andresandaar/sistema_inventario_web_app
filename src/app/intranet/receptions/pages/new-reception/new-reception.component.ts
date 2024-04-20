import { Component, OnInit } from '@angular/core';
import { Reception } from '../../interfaces/reception.interface';
import { ReceptionService} from '../../services/reception.service';
import { ProductService } from '../../../product-management/services/product.service';

import { SupplyService } from '../../../supply-management/services/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { Supply } from '@intranet/supply-management/interfaces/supply.interface';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Product } from '@intranet/product-management/interfaces/product.interface';

@Component({
  selector: 'app-new-reception',
  templateUrl: './new-reception.component.html',
  styleUrls: ['./new-reception.component.scss'],
})
export class NewReceptionComponent {
  public receptionForm = this.fb.group({
    fecha_hora: new FormControl<any>(''),
    numero_factura: new FormControl<string>(''),
    proveedor_id: new FormControl<string>(''),
    itemsReception: this.fb.array([]),
  });

  public supplys: Supply[] = [];
  public products: Product[] = [];

  constructor(
    private productService: ProductService,
    private supplyService: SupplyService,
    private receptionService: ReceptionService,
    private router: Router,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getSupplys();
    this.getProducts();
  }

  getSupplys() {
    this.supplyService.getSupply().subscribe((supplys: Supply[]) => {
      this.supplys = supplys;
    });
  }

  getProducts() {
    this.productService.getProduct().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onSubmit() {
    if (this.receptionForm.invalid) return;

    const newReception = {
      receptionData: {
        fecha_hora: this.currentReception.fecha_hora,
        numero_factura: this.currentReception.numero_factura,
        proveedor_id: this.currentReception.proveedor_id,
      },
      itemsData: this.currentReception.itemsReception,
    };

    console.log(newReception);

    this.receptionService.addReception(newReception).subscribe((product) => {
      this.router.navigateByUrl('intranet/receptions');
      this.showSnackbar(`created!`);
    });
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  getFormattedDate(
    value: string | number | Date,
    format: string | undefined = 'yyyy-MM-dd HH:mm:ss',
    timezone?: string | undefined,
    locale?: string | undefined
  ): any {
    return this.datePipe.transform(value, format) || '';
  }

  addItemReception() {
    const itemReception = this.fb.group({
      cantidad: [0],
      lote: [''],
      registro_invima: [''],
      fecha_vencimiento: [''],
      estado_presentacion_producto: [''],
      producto_id: [null],
    });

    this.itemsReception.push(itemReception);
    console.log(this.itemsReception);
  }

  deleteItemReception(itemReception: number) {
    this.itemsReception.removeAt(itemReception);
  }

  get currentReception(): any {
    return this.receptionForm.value;
  }

  get itemsReception(): any {
    return this.receptionForm.controls['itemsReception'] as FormArray;
  }
}
