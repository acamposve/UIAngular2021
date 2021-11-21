import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { MatChipInputEvent } from '@angular/material/chips';
import { StatusService } from 'src/app/_services/status.service';

@Component({
  selector: 'app-status-embarques-add',
  templateUrl: './status-embarques-add.component.html',
  styleUrls: ['./status-embarques-add.component.css']
})
export class StatusEmbarquesAddComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStatusForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  StatusForm!: FormGroup;
  constructor( public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private statusApi: StatusService) { }

  ngOnInit(): void {
    this.submitBookForm();
  }
  /* Reactive book form */
  submitBookForm() {
    this.StatusForm = this.fb.group({
      status: ['', [Validators.required]],
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
    return this.StatusForm.controls[controlName].hasError(errorName);
  }

  /* Submit book */
  submitStatusForm() {
    if (this.StatusForm.valid) {
      this.statusApi.create(this.StatusForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/status'))
      });
    }
  }

}
