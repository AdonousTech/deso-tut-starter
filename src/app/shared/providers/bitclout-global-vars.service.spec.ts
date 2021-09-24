import { TestBed } from '@angular/core/testing';

import { BitcloutGlobalVarsService } from './bitclout-global-vars.service';

describe('BitcloutGlobalVarsService', () => {
  let service: BitcloutGlobalVarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcloutGlobalVarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
