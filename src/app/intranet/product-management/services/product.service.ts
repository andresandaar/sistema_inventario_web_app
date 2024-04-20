import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = environment.andresApiRestBaseUrl;

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.baseUrl}/producto/all`);
  }
  
  getProductById(id: string): Observable<Product | undefined> {
    //Sie el id no existe y el get manda algun error , se retornara un undefined
    return this.http
      .get<Product>(`${this.baseUrl}/producto/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/producto`, product);
  }

  updateProduct(product: Product, idProduct: string): Observable<Product> {
    if (!idProduct) throw new Error('Product id is required');
    return this.http.put<Product>(
      `${this.baseUrl}/producto/${idProduct}`,
      product
    );
  }

  deleteProductById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/producto/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
