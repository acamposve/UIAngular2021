import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEmbarquesAddComponent } from './status-embarques-add.component';

describe('StatusEmbarquesAddComponent', () => {
  let component: StatusEmbarquesAddComponent;
  let fixture: ComponentFixture<StatusEmbarquesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusEmbarquesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEmbarquesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
