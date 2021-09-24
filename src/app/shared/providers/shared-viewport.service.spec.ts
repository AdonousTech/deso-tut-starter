import { TestBed } from '@angular/core/testing';

import { SharedViewportService } from './shared-viewport.service';

describe('SharedViewportService', () => {
  let service: SharedViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedViewportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
