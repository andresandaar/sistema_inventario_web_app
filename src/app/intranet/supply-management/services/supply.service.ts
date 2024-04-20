import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Supply } from '../interfaces/supply.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {

  private baseUrl: string = environment.andresApiRestBaseUrl;

  constructor(private http: HttpClient) {}

  getSupply(): Observable<Supply[]> {
    return this.http.get<any[]>(`${this.baseUrl}/proveedor/all`);
  }

  getSupplyById(id: string): Observable<Supply | undefined> {
    //Sie el id no existe y el get manda algun error , se retornara un undefined
    return this.http
      .get<Supply>(`${this.baseUrl}/proveedor/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  addSupply(supply: Supply): Observable<Supply> {
    return this.http.post<Supply>(`${this.baseUrl}/proveedor`, supply);
  }

  updateSupply(supply: Supply, idSupply: string): Observable<Supply> {
    if (!idSupply) throw new Error('Supply id is required');
    return this.http.put<Supply>(
      `${this.baseUrl}/proveedor/${idSupply}`,
      supply
    );
  }

  deleteSupplyById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/proveedor/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
  
}
