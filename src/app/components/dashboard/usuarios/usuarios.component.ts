import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/_models/user';
import { UsuariosService } from 'src/app/_services/usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit  {
  UserData: any = [];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username','role', 'acciones'];



  constructor(private userApi: UsuariosService) {
    this.userApi.getAll().subscribe((data: any) => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }


  ngOnInit(): void {  }

  deleteUser(index: number, e: { id: string; }){

    console.log("id para borrar" + e.id);
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.userApi.delete(e.id).subscribe()
    }
  }


}
