import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarquesEditComponent } from './embarques-edit.component';

describe('EmbarquesEditComponent', () => {
  let component: EmbarquesEditComponent;
  let fixture: ComponentFixture<EmbarquesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarquesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarquesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
