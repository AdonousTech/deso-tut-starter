import { Injectable } from '@angular/core';
import { Subject,
         Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitcloutUsdExchangeRateSingletonService {

  // observable source
  private bitcloutToUsdExchangeRateDisplay = new Subject<string>();
  private bitcloutToUsdExchangeRateNumber = new Subject<number>();

  // observable stream
  $bitcloutToUsdExchangeRateDisplay: Observable<string> = this.bitcloutToUsdExchangeRateDisplay.asObservable();
  $bitcloutToUsdExchangeRateNumber: Observable<number> = this.bitcloutToUsdExchangeRateNumber.asObservable();

  public emitBitCloutToUsdExchangeRateDisplay(payload: string) {
    //console.log('BitCloutUsdExhchangeRateSingleton :: emitted payload :: ', payload);
    this.bitcloutToUsdExchangeRateDisplay.next(payload);
  }

  public emitBitCloutToUsdExchangeRateNumber(payload: number) {
    //console.log('BitCloutUsdExchangeRateSingleton :: emitted NUMBER payload ::', payload);
    this.bitcloutToUsdExchangeRateNumber.next(payload);
  }

  constructor() { }
}

