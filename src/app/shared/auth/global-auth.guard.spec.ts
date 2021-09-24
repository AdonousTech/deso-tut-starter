import { TestBed } from '@angular/core/testing';

import { GlobalAuthGuard } from './global-auth.guard';

describe('GlobalAuthGuard', () => {
  let guard: GlobalAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GlobalAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
