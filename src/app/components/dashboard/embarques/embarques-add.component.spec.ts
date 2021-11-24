import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarquesAddComponent } from './embarques-add.component';

describe('EmbarquesAddComponent', () => {
  let component: EmbarquesAddComponent;
  let fixture: ComponentFixture<EmbarquesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarquesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarquesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
