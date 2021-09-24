import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcPriceDisplayComponent } from './cc-price-display.component';

describe('CcPriceDisplayComponent', () => {
  let component: CcPriceDisplayComponent;
  let fixture: ComponentFixture<CcPriceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcPriceDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcPriceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
