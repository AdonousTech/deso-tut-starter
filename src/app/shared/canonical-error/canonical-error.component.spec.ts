import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanonicalErrorComponent } from './canonical-error.component';

describe('CanonicalErrorComponent', () => {
  let component: CanonicalErrorComponent;
  let fixture: ComponentFixture<CanonicalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanonicalErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanonicalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
