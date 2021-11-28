import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Receipt } from '../_models/receipt';
import { UsuariosEmbarques } from '../_models/usuariosembarques';
import { ReceiptsAccounts } from '../_models/receipts_accounts';

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
    return this.http.get<Receipt>(
      `${environment.apiUrl}/api/Receipts/${id}`
    );
  }

  getByAccountId(id: number) {
    return this.http.get<ReceiptsAccounts[]>(
      `${environment.apiUrl}/api/Receipts/ReceiptsByAccount/${id}`
    );
  }


  create(params: any) {
    return this.http.post(baseUrl, params);
  }


  createUsers(params: any) {


    return this.http.post(`${baseUrl}/addUsers`, params);
  }

  update(id: number, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
