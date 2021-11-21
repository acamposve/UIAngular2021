import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { MatChipInputEvent } from '@angular/material/chips';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-usuarios-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.css']
})
export class UsuariosAddComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetUserForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm!: FormGroup;
  constructor( public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userApi: UsuariosService) { }

  ngOnInit(): void {
    this.submitBookForm();
  }
  /* Reactive book form */
  submitBookForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]],
      ConfirmPassword:['', [Validators.required]],
    })
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
    return this.userForm.controls[controlName].hasError(errorName);
  }

  /* Submit book */
  submitUserForm() {
    if (this.userForm.valid) {
      this.userApi.create(this.userForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/usuarios'))
      });
    }
  }

}
