import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedAuthComponent } from './managed-auth.component';

describe('ManagedAuthComponent', () => {
  let component: ManagedAuthComponent;
  let fixture: ComponentFixture<ManagedAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
