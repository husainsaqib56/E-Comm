import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewOrderSummaryComponent } from './view-order-summary.component';

describe('ViewOrderSummaryComponent', () => {
  let component: ViewOrderSummaryComponent;
  let fixture: ComponentFixture<ViewOrderSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
