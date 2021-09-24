import { TestBed } from '@angular/core/testing';

import { BitcloutUsdExchangeRateSingletonService } from './bitclout-usd-exchange-rate-singleton.service';

describe('BitcloutUsdExchangeRateSingletonService', () => {
  let service: BitcloutUsdExchangeRateSingletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitcloutUsdExchangeRateSingletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
