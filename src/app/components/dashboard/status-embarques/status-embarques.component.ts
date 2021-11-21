import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Status } from 'src/app/_models/status';
import { StatusService } from 'src/app/_services/status.service';

@Component({
  selector: 'app-status-embarques',
  templateUrl: './status-embarques.component.html',
  styleUrls: ['./status-embarques.component.css'],
})
export class StatusEmbarquesComponent implements OnInit {
  StatusData: any = [];
  dataSource!: MatTableDataSource<Status>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = ['id', 'status', 'acciones'];
  constructor(private statusApi: StatusService, private router: Router) {
    this.statusApi.getAll().subscribe((data: any) => {
      this.StatusData = data;
      this.dataSource = new MatTableDataSource<Status>(this.StatusData);
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
  deleteStatus(index: number, e: { id: string }) {
    console.log('id para borrar' + e.id);
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.statusApi.delete(e.id).subscribe();
    }
  }

  addData() {
    this.router.navigateByUrl('/dashboard/statusAdd');
  }
}
