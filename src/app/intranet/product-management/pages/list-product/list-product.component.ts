import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {
  
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'estado',
    'nombre_laboratorio',
    'acciones',
  ];

  public products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProduct().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
    });
  }

  navigate(id: any) {
    this.router.navigate(['intranet/product-management/edit', id]);
  }

  OnDeleteProduct(id: any, nombre: string) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: { nombre: nombre },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.productService.deleteProductById(id)),
        filter((result: boolean) => result)
      )
      .subscribe(() => this.getProducts());
  }
}
