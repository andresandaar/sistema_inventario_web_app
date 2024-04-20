import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product, Estado } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent {
  public productForm = new FormGroup({
    codigo: new FormControl<string>('', { nonNullable: true }),
    nombre: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    estado: new FormControl<Estado>(Estado.Inactivo),
    nombre_laboratorio: new FormControl<string>(''),
  });

  public currentId: string = '';
  public estados = [
    {
      id: 'Activo',
      name: 'Activo',
    },
    {
      id: 'Inactivo',
      name: 'Inactivo',
    },
  ];

  constructor(
    private productService: ProductService,
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
          return this.productService.getProductById(id);
        })
      )
      .subscribe((product) => {
        if (!product) return this.router.navigateByUrl('intranet/product-management');
        this.productForm.reset(product);
        return;
      });
  }
  onSubmit() {
    if (this.productForm.invalid) return;

    if (this.currentId) {
      this.productService
        .updateProduct(this.currentProduct, this.currentId)
        .subscribe((product) => {
          this.showSnackbar(`${product.nombre}, update!`);
          this.router.navigateByUrl('intranet/product-management');
          //TODO: Mostrar snackbar
        });
        return
    }

    this.productService.addProduct(this.currentProduct).subscribe((product) => {

      this.router.navigateByUrl('intranet/product-management');
      this.showSnackbar(`${product.nombre}, created!`);
    });

  }

  OnDeleteProduct() {
    if (!this.currentId) throw new Error('Product id is required');
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.currentProduct,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.productService.deleteProductById(this.currentId)),
        filter((result: boolean) => result)
      )
      .subscribe(() =>
        this.router.navigateByUrl('intranet/product-management')
      );
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
  get currentProduct(): Product {
    const product = this.productForm.value as Product;
    return product;
  }
}
