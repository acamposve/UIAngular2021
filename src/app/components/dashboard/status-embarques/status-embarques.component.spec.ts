import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEmbarquesComponent } from './status-embarques.component';

describe('StatusEmbarquesComponent', () => {
  let component: StatusEmbarquesComponent;
  let fixture: ComponentFixture<StatusEmbarquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusEmbarquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEmbarquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
