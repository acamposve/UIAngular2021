import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptdetailComponent } from './receiptdetail.component';

describe('ReceiptdetailComponent', () => {
  let component: ReceiptdetailComponent;
  let fixture: ComponentFixture<ReceiptdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
