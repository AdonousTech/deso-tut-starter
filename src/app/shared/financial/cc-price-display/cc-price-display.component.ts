import { Component, 
         OnInit,
         OnChanges,
         Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGetSingleProfileResponsePayload, 
         IProfile } from '@adonoustech/cloutscript-core';
import { BitcloutUtilitiesService } from '../../providers';
import { BitcloutUsdExchangeRateSingletonService } from '../../providers/bitclout-usd-exchange-rate-singleton.service';

@Component({
  selector: 'cc-price-display',
  templateUrl: './cc-price-display.component.html',
  styleUrls: ['./cc-price-display.component.css']
})
export class CcPriceDisplayComponent implements OnInit, OnChanges {

  @Input() profile: IGetSingleProfileResponsePayload | undefined;

  coinPriceNanos: number = 0;
  coinPriceUSDNumber: number = 0;

  exchangeRateSubscription: Subscription | undefined;

  constructor(private bcUtil: BitcloutUtilitiesService,
              private exchangeRateSingleton: BitcloutUsdExchangeRateSingletonService) { }

  ngOnInit(): void {
  }

  /**
   * Ensure updates to this component regardless of where the component
   * is instantiated. 
   * @memberof CcPriceDisplayComponent
   */
  ngOnChanges(): void {
    this.refreshCoinPrice();
  }

  private refreshCoinPrice(): void {
    let _coinPriceNanos;

    if (this.profile) {
      _coinPriceNanos = this.profile?.Profile.CoinPriceBitCloutNanos || 0;
    }

    this.coinPriceUSDNumber = this.bcUtil.nanosToUSDNumber(<number>_coinPriceNanos);

  }

  private subscribe(): void {
    this.exchangeRateSubscription = this.exchangeRateSingleton
        .$bitcloutToUsdExchangeRateDisplay
        .subscribe(
          {
            next: (() => {
              this.refreshCoinPrice();
            })
          }
        )

  }

}
