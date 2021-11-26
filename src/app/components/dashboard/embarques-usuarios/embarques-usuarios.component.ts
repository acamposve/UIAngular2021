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
import { Receipt } from 'src/app/_models/receipt';

@Component({
  selector: 'app-embarques-usuarios',
  templateUrl: './embarques-usuarios.component.html',
  styleUrls: ['./embarques-usuarios.component.css'],
})
export class EmbarquesUsuariosComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myFiles: string[] = [];
  myUsers: Number[] = [];
  userList: User[] = [];

  embarquesList: Receipt[] = [];

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetEmbarquesForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  embarquesForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private embarquesApi: EmbarquesService,

    private userApi: UsuariosService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    this.submitBookForm();
    this.userApi
      .getAll()
      .pipe(first())
      .subscribe((userList) => (this.userList = userList));

    this.embarquesApi
      .getAll()
      .pipe(first())
      .subscribe((embarquesList) => (this.embarquesList = embarquesList));
  }
  /* Reactive book form */
  submitBookForm() {
    this.embarquesForm = this.fb.group({
      embarqueid: ['', [Validators.required]],
      userid: ['', [Validators.required]],
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
  submitEmbarquesUsuariosForm() {
    if (this.embarquesForm.valid) {

console.log(this.embarquesForm.value);

      this.embarquesApi.createUsers(this.embarquesForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
      });
    }
  }
}
