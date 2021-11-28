import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/_models/role';
import { User } from 'src/app/_models/user';
import { LoginService } from 'src/app/_services/login.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Receipt } from 'src/app/_models/receipt';
import { EmbarquesService } from 'src/app/_services/embarques.service';
import { ReceiptsAccounts } from 'src/app/_models/receipts_accounts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  loading = false;

  ReceiptData: any = [];
  dataSource!: MatTableDataSource<ReceiptsAccounts>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'status',
    'referencia',
    'fechaArribo',
    'origen',
    'destino',
    'acciones',
  ];

  user: User;
  userFromApi!: User;
  imagen: any;
  embarquesList: Receipt[] = [];
  embarquesCuentasList: ReceiptsAccounts[] = [];

  constructor(
    private userService: UsuariosService,
    private authenticationService: LoginService,
    private domSanitizer: DomSanitizer,
    private embarquesApi: EmbarquesService
  ) {
    this.user = this.authenticationService.userValue;
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
  ngOnInit(): void {


    this.loading = true;
    this.userService
      .getById(Number(this.user.id))
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
    this.embarquesApi
      .getAll()
      .pipe(first())
      .subscribe((embarquesList) => (this.embarquesList = embarquesList));

    this.embarquesApi
      .getByAccountId(Number(this.user.id))
      .subscribe((data: any) => {
        this.ReceiptData = data;
        this.dataSource = new MatTableDataSource<ReceiptsAccounts>(
          this.ReceiptData
        );
        console.log(this.ReceiptData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);
      });

    if (this.user.role === 'User') {
      console.log('buscar embarques');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
