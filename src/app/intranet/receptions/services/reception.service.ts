import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {
  ReceptionAll,
  ItemsReception,
} from '../interfaces/reception.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ReceptionService {
  private baseUrl: string = environment.andresApiRestBaseUrl;

  constructor(private http: HttpClient) {}

  getReception(): Observable<ReceptionAll[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recepcion/all`);
  }

  getReceptionById(idRecepti: string): Observable<ReceptionAll | undefined> {
    //Sie el id no existe y el get manda algun error , se retornara un undefined
    return this.http
      .get<ReceptionAll>(`${this.baseUrl}/recepcion/${idRecepti}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getItemsReceptionById(
    idRecepti: string
  ): Observable<ItemsReception | undefined> {
    //Sie el id no existe y el get manda algun error , se retornara un undefined
    return this.http
      .get<ItemsReception>(`${this.baseUrl}/recepcion/${idRecepti}`)
      .pipe(catchError((error) => of(undefined)));
  }

  addReception(reception: any): Observable<ReceptionAll> {
    return this.http.post<ReceptionAll>(`${this.baseUrl}/recepcion`, reception);
  }

  updateReception(
    supply: ReceptionAll,
    idReception: string
  ): Observable<ReceptionAll> {
    if (!idReception) throw new Error('ReceptionAll id is required');
    return this.http.put<ReceptionAll>(
      `${this.baseUrl}/recepcion/${idReception}`,
      supply
    );
  }

  deleteReceptionById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/recepcion/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
