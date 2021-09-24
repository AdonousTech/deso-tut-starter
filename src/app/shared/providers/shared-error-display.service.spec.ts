import { TestBed } from '@angular/core/testing';

import { SharedErrorDisplayService } from './shared-error-display.service';

describe('SharedErrorDisplayService', () => {
  let service: SharedErrorDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedErrorDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
