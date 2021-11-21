import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, Observable } from 'rxjs';



const baseUrl = `${environment.apiUrl}/users`;
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);



  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
}




  getById(id: string) {
    console.log('id' + id);
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
