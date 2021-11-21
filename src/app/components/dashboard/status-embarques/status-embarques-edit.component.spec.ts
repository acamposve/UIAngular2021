import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEmbarquesEditComponent } from './status-embarques-edit.component';

describe('StatusEmbarquesEditComponent', () => {
  let component: StatusEmbarquesEditComponent;
  let fixture: ComponentFixture<StatusEmbarquesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusEmbarquesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEmbarquesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
