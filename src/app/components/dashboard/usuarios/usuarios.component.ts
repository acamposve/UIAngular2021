import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  UserData: any = [];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'username',
    'role',
    'acciones',
  ];

  constructor(private userApi: UsuariosService,     private router: Router) {
    this.userApi.getAll().subscribe((data: any) => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);
    });
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteUser(index: number, e: { id: string; }){

    console.log("id para borrar" + e.id);
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.userApi.delete(e.id).subscribe()
    }
  }

  addData() {
    this.router.navigateByUrl('/dashboard/usuariosAdd');
  }
}
