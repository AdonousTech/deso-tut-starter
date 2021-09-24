import { TestBed } from '@angular/core/testing';

import { BitcloutBackendApiHelperService } from './bitclout-backend-api-helper.service';

describe('BitcloutBackendApiHelperService', () => {
  let service: BitcloutBackendApiHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcloutBackendApiHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
