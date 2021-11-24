import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Receipt } from '../_models/receipt';

const baseUrl = `${environment.apiUrl}/api/Receipts`;
@Injectable({
  providedIn: 'root'
})
export class EmbarquesService {


  constructor(private http: HttpClient) {}
  dataChange: BehaviorSubject<Receipt[]> = new BehaviorSubject<Receipt[]>([]);

  getAll() {
    return this.http.get<Receipt[]>(`${environment.apiUrl}/api/Receipts`);
  }

  getById(id: number) {
    console.log('id' + id);
    return this.http.get<Receipt>(
      `${environment.apiUrl}/api/Receipts/${id}`
    );
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: number, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
