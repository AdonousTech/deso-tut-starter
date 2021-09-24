import { TestBed } from '@angular/core/testing';

import { BitcloutUtilitiesService } from './bitclout-utilities.service';

describe('BitcloutUtilitiesService', () => {
  let service: BitcloutUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcloutUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
