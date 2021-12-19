import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Receipt } from 'src/app/_models/receipt';
import { EmbarquesService } from 'src/app/_services/embarques.service';



@Component({
  selector: 'app-embarques',
  templateUrl: './embarques.component.html',
  styleUrls: ['./embarques.component.css']
})
export class EmbarquesComponent implements OnInit {

  ReceiptData: any = [];
  dataSource!: MatTableDataSource<Receipt>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'referencia',
    'fechaarribo',
    'status',
    'origen',
    'destino',
    'acciones',
  ];

  constructor(private receiptApi: EmbarquesService,     private router: Router) {
    this.receiptApi.getAll().subscribe((data: any) => {
      this.ReceiptData = data;
      this.dataSource = new MatTableDataSource<Receipt>(this.ReceiptData);
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
  deleteReceipt(index: number, e: { id: string; }){

    console.log("id para borrar" + e.id);
    if(window.confirm('Va a eliminar el embarque y toda su información relacionada, está seguro?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.receiptApi.delete(e.id).subscribe()
    }
  }

  addData() {
    this.router.navigateByUrl('/dashboard/receiptAdd');
  }

}
