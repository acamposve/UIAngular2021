import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusService } from 'src/app/_services/status.service';


@Component({
  selector: 'app-status-embarques-edit',
  templateUrl: './status-embarques-edit.component.html',
  styleUrls: ['./status-embarques-edit.component.css']
})
export class StatusEmbarquesEditComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStatusForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  StatusForm!: FormGroup;
  idnumerico!: number | 0;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private statusApi: StatusService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');

    console.log('aqui ' + id);

    this.statusApi.getById(Number(id)).subscribe((data) => {
      this.StatusForm = this.fb.group({
        status: [data.status, [Validators.required]],
      });
    });
  }

  ngOnInit(): void {
    this.updateStatusForm();
  }

  /* Reactive book form */
  updateBookForm() {
    this.StatusForm = this.fb.group({
      status: ['', [Validators.required]],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.StatusForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateStatusForm() {
    console.log(this.StatusForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');

    if (window.confirm('Are you sure you want to update?')) {
      this.statusApi.update(Number(id), this.StatusForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard/status'));
      });
    }
  }

}
