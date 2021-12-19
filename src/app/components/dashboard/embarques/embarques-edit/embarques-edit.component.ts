import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Status } from 'src/app/_models/status';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmbarquesService } from 'src/app/_services/embarques.service';
import { StatusService } from 'src/app/_services/status.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { first } from 'rxjs/internal/operators/first';
import { MatChipInputEvent } from '@angular/material/chips';
import { FilesReceipt } from 'src/app/_models/files-receipt';
import { Receipt } from 'src/app/_models/receipt';
import { AccountsReceipts } from 'src/app/_models/accounts_receipts';

@Component({
  selector: 'app-embarques-edit',
  templateUrl: './embarques-edit.component.html',
  styleUrls: ['./embarques-edit.component.css'],
})
export class EmbarquesEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myFiles: string[] = [];
  receiptactual!: Receipt;
  myUsers: Number[] = [];
  statusList: Status[] = [];
  archivos!: FilesReceipt[];
  accountsList!: AccountsReceipts[];
  accountsNotList!: AccountsReceipts[];
  loading = false;

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetEmbarquesForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  embarquesForm!: FormGroup;
  embarquesCuentasForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private embarquesApi: EmbarquesService,
    private statusApi: StatusService,
    private userApi: UsuariosService,
    private actRoute: ActivatedRoute,

    private dateAdapter: DateAdapter<Date>
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

    this.embarquesForm = this.fb.group({
      accountid: ['', [Validators.required]],
    });

    this.embarquesApi.getById(Number(id)).subscribe((data) => {
      this.embarquesForm = this.fb.group({
        referencia: [data.referencia, [Validators.required]],
        fechaarribo: [data.fechaArribo, [Validators.required]],
        origen: [data.origen, [Validators.required]],
        destino: [data.destino, [Validators.required]],
        statusid: ['', [Validators.required]],
        cantidadcontainers: [data.cantidadContainers, [Validators.required]],
        mercancia: [data.mercancia, [Validators.required]],

        file: ['', [Validators.required]],
      });
    });
  }

  ngOnInit(): void {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.submitBookForm();
    this.statusApi
      .getAll()
      .pipe(first())
      .subscribe((statusList) => (this.statusList = statusList));

    this.embarquesApi
      .getFilesByReceiptId(Number(id))
      .pipe(first())
      .subscribe((archivos) => (this.archivos = archivos));

    this.embarquesApi
      .getAccountsByReceiptId(Number(id))
      .pipe(first())
      .subscribe((accountsList) => (this.accountsList = accountsList));

    this.embarquesApi
      .getAccountsNotInReceipt(Number(id))
      .pipe(first())
      .subscribe((accountsNotList) => (this.accountsNotList = accountsNotList));

    this.embarquesApi
      .getById(Number(id))
      .pipe(first())
      .subscribe((receiptactual) => (this.receiptactual = receiptactual));
  }
  /* Reactive book form */
  submitBookForm() {
    this.embarquesForm = this.fb.group({
      referencia: ['', [Validators.required]],
      fechaarribo: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      statusid: ['', [Validators.required]],
      cantidadcontainers: ['', [Validators.required]],
      mercancia: ['', [Validators.required]],

      file: ['', [Validators.required]],
    });
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.embarquesForm.controls[controlName].hasError(errorName);
  };

  deleteReceiptFile(index: number) {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    if (window.confirm('Are you sure')) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      console.log('entro');
      this.embarquesApi.deleteReceiptFile(index).subscribe((res) => {
        this.embarquesApi
          .getFilesByReceiptId(Number(id))
          .pipe(first())
          .subscribe((archivos) => (this.archivos = archivos));
        this.ngZone.run(() => this.router.navigate([currentUrl]));
      });
    }
  }

  submitEmbarquesForm() {
    const formData = new FormData();
    var id = this.actRoute.snapshot.paramMap.get('id');
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
    }
    var fecha = new Date(this.embarquesForm.value.fechaarribo).toISOString();
    formData.append('id', String(id));
    formData.append('referencia', this.embarquesForm.value.referencia);
    formData.append('origen', this.embarquesForm.value.origen);
    formData.append('destino', this.embarquesForm.value.destino);
    formData.append('fechaarribo', fecha);
    formData.append('statusid', this.embarquesForm.value.statusid);
    formData.append(
      'cantidadcontainers',
      this.embarquesForm.value.cantidadcontainers
    );
    formData.append('mercancia', this.embarquesForm.value.mercancia);

    let currentUrl = this.router.url;

    if (window.confirm('Are you sure you want to update?')) {
      this.loading = true;

      this.embarquesApi.update(formData).subscribe((res) => {
        this.ngZone.run(() =>
          this.router.navigateByUrl('/dashboard/embarques')
        );
      });
    }
  }

  addUserToReceipt(usuarioid: number) {
    const usuario = usuarioid;
    const embarque = this.actRoute.snapshot.paramMap.get('id') || '{}';

    let currentUrl = this.router.url;
    var id = this.actRoute.snapshot.paramMap.get('id');


    this.loading = true;
    this.embarquesApi
      .createUser(embarque, usuario)
      .pipe(first())
      .subscribe((res) => {

        this.embarquesApi
        .getAccountsByReceiptId(Number(id))
        .pipe(first())
        .subscribe((accountsList) => (this.accountsList = accountsList));

      this.embarquesApi
        .getAccountsNotInReceipt(Number(id))
        .pipe(first())
        .subscribe(
          (accountsNotList) => (this.accountsNotList = accountsNotList)
        );

        this.ngZone.run(() =>
          this.router.navigateByUrl(currentUrl)
        );
      });
  }

  deleteUserToReceipt(usuarioid: number) {
    const usuario = usuarioid;
    const embarque = this.actRoute.snapshot.paramMap.get('id') || '{}';

    let currentUrl = this.router.url;
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.loading = true;
    this.embarquesApi
      .deleteUser(embarque, usuario)
      .pipe(first())
      .subscribe((res) => {
        this.embarquesApi
          .getAccountsByReceiptId(Number(id))
          .pipe(first())
          .subscribe((accountsList) => (this.accountsList = accountsList));

        this.embarquesApi
          .getAccountsNotInReceipt(Number(id))
          .pipe(first())
          .subscribe(
            (accountsNotList) => (this.accountsNotList = accountsNotList)
          );

        this.ngZone.run(() => this.router.navigateByUrl(currentUrl));
      });
  }
}
