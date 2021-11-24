import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { EmbarquesService } from 'src/app/_services/embarques.service';
import { StatusService } from 'src/app/_services/status.service';
import { Status } from 'src/app/_models/status';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { UsuariosService } from 'src/app/_services/usuarios.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-embarques-add',
  templateUrl: './embarques-add.component.html',
  styleUrls: ['./embarques-add.component.css'],
})
export class EmbarquesAddComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myFiles: string[] = [];
  myUsers: Number[] = [];
  statusList: Status[] = [];

  usersList: User[] = [];

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetEmbarquesForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  embarquesForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private embarquesApi: EmbarquesService,
    private statusApi: StatusService,
    private userApi: UsuariosService,
    private dateAdapter: DateAdapter<Date>
  ) {

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.submitBookForm();
    this.statusApi
      .getAll()
      .pipe(first())
      .subscribe((statusList) => (this.statusList = statusList));

    this.userApi
      .getAll()
      .pipe(first())
      .subscribe((usersList) => (this.usersList = usersList));
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
      userid: ['', [Validators.required]],
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

  /* Submit book */
  submitEmbarquesForm() {
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
    }
var fecha = new Date (this.embarquesForm.value.fechaarribo).toISOString();
console.log("fecha " + fecha);

    formData.append('referencia', this.embarquesForm.value.referencia);
    formData.append('origen', this.embarquesForm.value.origen);
    formData.append('destino', this.embarquesForm.value.destino);
    formData.append('fechaarribo', fecha);
    formData.append('statusid', this.embarquesForm.value.statusid);
    formData.append('cantidadcontainers', this.embarquesForm.value.cantidadcontainers);
    formData.append('mercancia', this.embarquesForm.value.mercancia);
    formData.append('userid', this.embarquesForm.value.userid);
    this.embarquesApi.create(formData).subscribe((res) => {
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard/embarques'));
    });
  }
}
