import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Receipt } from '../_models/receipt';
import { UsuariosEmbarques } from '../_models/usuariosembarques';
import { ReceiptsAccounts } from '../_models/receipts_accounts';
import { FilesReceipt } from '../_models/files-receipt';
import { AccountsReceipts } from '../_models/accounts_receipts';

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});
let options = {
  headers: headers
}
const baseUrl = `https://w270037.ferozo.com/api/Receipts`;
@Injectable({
  providedIn: 'root'
})
export class EmbarquesService {


  constructor(private http: HttpClient) {}
  dataChange: BehaviorSubject<Receipt[]> = new BehaviorSubject<Receipt[]>([]);

  getAll() {
    return this.http.get<Receipt[]>(`${environment.apiUrl}/Receipts`);
  }

  getById(id: number) {
    return this.http.get<Receipt>(
      `${environment.apiUrl}/Receipts/${id}`
    );
  }

  getByAccountId(id: number) {
    return this.http.get<ReceiptsAccounts[]>(
      `${environment.apiUrl}/Receipts/ReceiptsByAccount/${id}`
    );
  }

  getFilesByReceiptId(id: number) {
    return this.http.get<FilesReceipt[]>(
      `${environment.apiUrl}/Receipts/FilesByReceipt/${id}`
    );
  }

  create(params: any) {

    console.log("url " + baseUrl);
    return this.http.post(baseUrl, params);
  }


  createUsers(params: any) {
    return this.http.post(`${baseUrl}/addUsers`, params);
  }



  createUser(embarqueid: string, accountid: number) {
    return this.http
      .post<any>(`${environment.apiUrl}/Receipts/addSingleUser`, {
        embarqueid,
        accountid,
      });
  }


  deleteUser(embarqueid: string, accountid: number) {
    return this.http
      .post<any>(`${environment.apiUrl}/Receipts/DeleteReceiptAccount`, {
        embarqueid,
        accountid,
      });
  }


  getAttachment(imagen: string) {
    return this.http.get<File>(
      `${environment.apiUrl}/Receipts/GetFile/${imagen}`
    );
  }

  getAccountsByReceiptId(id: number) {
    return this.http.get<AccountsReceipts[]>(
      `${environment.apiUrl}/Receipts/accounts/${id}`
    );
  }
  getAccountsNotInReceipt(id: number) {
    return this.http.get<AccountsReceipts[]>(
      `${environment.apiUrl}/Receipts/accountsnptinreceipt/${id}`
    );
  }

  update(params: any) {
    console.log("entro a update ");
    console.log("parametros ", params);
    console.log("url " + baseUrl);
    return this.http.put(baseUrl, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteReceiptFile(id: number) {
    return this.http.delete(`${baseUrl}/DeleteReceiptFile/${id}`);
  }
}
