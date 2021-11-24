import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarquesUsuariosComponent } from './embarques-usuarios.component';

describe('EmbarquesUsuariosComponent', () => {
  let component: EmbarquesUsuariosComponent;
  let fixture: ComponentFixture<EmbarquesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarquesUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbarquesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
