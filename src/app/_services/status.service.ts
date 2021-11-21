import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../_models/status';

const baseUrl = `${environment.apiUrl}/api/ReceiptStatus`;
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}
  dataChange: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>([]);

  getAll() {
    return this.http.get<Status[]>(`${environment.apiUrl}/api/ReceiptStatus`);
  }

  getById(id: number) {
    console.log('id' + id);
    return this.http.get<Status>(
      `${environment.apiUrl}/api/ReceiptStatus/${id}`
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
