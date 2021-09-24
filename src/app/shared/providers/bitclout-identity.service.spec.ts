import { TestBed } from '@angular/core/testing';

import { BitcloutIdentityService } from './bitclout-identity.service';

describe('BitcloutIdentityService', () => {
  let service: BitcloutIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcloutIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
