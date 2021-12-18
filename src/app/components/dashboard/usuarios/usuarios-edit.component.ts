import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css'],
})
export class UsuariosEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStudentForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm!: FormGroup;
  idnumerico!: number | 0;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private userApi: UsuariosService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');




    this.userApi.getById(Number(id)).subscribe((data) => {
      this.userForm = this.fb.group({
        firstName: [data.firstName, [Validators.required]],
        lastName: [data.lastName, [Validators.required]],
        username: [data.username, [Validators.required]],
        password: [data.password, [Validators.required]],

        ConfirmPassword: [data.password, [Validators.required]],
        role: [data.role, [Validators.required]],
      });
    });
  }

  ngOnInit(): void {
    this.updateBookForm();
  }

  /* Reactive book form */
  updateBookForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateUserForm() {
    console.log(this.userForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');

    if (window.confirm('Are you sure you want to update?')) {
      this.userApi.update(Number(id), this.userForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/usuarios'));
      });
    }
  }
}
