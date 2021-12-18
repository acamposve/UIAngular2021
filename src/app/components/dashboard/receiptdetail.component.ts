import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FilesReceipt } from 'src/app/_models/files-receipt';
import { Receipt } from 'src/app/_models/receipt';
import { EmbarquesService } from 'src/app/_services/embarques.service';

@Component({
  selector: 'app-receiptdetail',
  templateUrl: './receiptdetail.component.html',
  styleUrls: ['./receiptdetail.component.css'],
})
export class ReceiptdetailComponent implements OnInit {
  data!: Receipt;
  id!: number;
  archivos!: FilesReceipt[];
  imagenURL!: File;
  constructor(
    private receiptService: EmbarquesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.receiptService
      .getById(this.id)
      .pipe(first())
      .subscribe((data) => (this.data = data));

    this.receiptService
      .getFilesByReceiptId(this.id)
      .pipe(first())
      .subscribe((archivos) => (this.archivos = archivos));
  }

  mostrarImagen(imagen: string) {
    return this.receiptService
      .getAttachment(imagen)
      .pipe(first())
      .subscribe((archivo) => (this.imagenURL = archivo));
  }
}
