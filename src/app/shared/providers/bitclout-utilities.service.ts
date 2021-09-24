import { Injectable } from '@angular/core';
import { IBitCloutIdentityUsersObject } from '@adonoustech/cloutscript-core';
import { QueryCommandOutput } from '@aws-sdk/client-dynamodb';

@Injectable({
  providedIn: 'root'
})
export class BitcloutUtilitiesService {

  // See https://github.com/bitclout/frontend/blob/d4295a6167f4f7330cb29e0a808e743d901c6e02/src/app/global-vars.service.ts#L22
  DEFAULT_NANOS_PER_USD_EXCHANGE_RATE = 1e9;
  nanosPerUSDExchangeRate: number |  undefined;
  formatUSDMemo: any;
  nanosToBitCloutMemo: any;
  satoshisPerBitCloutExchangeRate: number = 0;
  NanosSold: number |  undefined;
  ProtocolUSDCentsPerBitcoinExchangeRate: number |  undefined;
  usdPerBitcoinExchangeRate: number = 0;
  bitcloutToUSDExchangeRateToDisplay: string |  undefined;
  bitcloutToUSDExchangeRateNumber: number |  undefined;

  constructor() {
    this.formatUSDMemo = {};
    this.nanosToBitCloutMemo = {};
  }

  /**
   * After fetching the BitClout Identity object from the DB, parse and return
   * to caller
   * @param rawQueryResponse
   * @memberof BitcloutUtilitiesService
   */
  parseBitCloutIdentityFromDB(rawQueryResponse: string): IBitCloutIdentityUsersObject {

    const parsedBCIdentity: QueryCommandOutput = JSON.parse(<string> rawQueryResponse);
    const _parsedBCIdentity2 = parsedBCIdentity.Items ?  parsedBCIdentity.Items[0].bitclout : null;
    const _returnObject: IBitCloutIdentityUsersObject = _parsedBCIdentity2 as any;
    return _returnObject;
  }

  _parseFloat(val: any) {
    return parseFloat(val) ? parseFloat(val) : 0;
  }

     /*
   * Converts long numbers to convenient abbreviations
   * Examples:
   *   value: 12345, decimals: 1 => 12.3K
   *   value: 3492311, decimals: 2 => 3.49M
   * */
  abbreviateNumber(value: number, decimals: number, formatUSD: boolean = false): string {
    let shortValue: any;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor((('' + value.toFixed(0)).length - 1) / 3);
    if (suffixNum === 0) {
      // if the number is less than 1000, we should only show at most 2 decimals places
      decimals = Math.min(2, decimals);
    }
    shortValue = (value / Math.pow(1000, suffixNum)).toFixed(decimals);
    if (formatUSD) {
      shortValue = this.formatUSD(shortValue, decimals);
    }
    return shortValue + suffixes[suffixNum];
  }

  nanosToUSDNumber(nanos: number): number {
    return nanos / <number>this.nanosPerUSDExchangeRate;
  }

  nanosToUSD(nanos: number, decimal?: number): string {
    if (decimal == null) {
        decimal = 4;
    }
    return this.formatUSD(this.nanosToUSDNumber(nanos), decimal);
  }

  formatUSD(num: number, decimal: number): string {
    if (this.formatUSDMemo[num] && this.formatUSDMemo[num][decimal]) {
      return this.formatUSDMemo[num][decimal];
    }

    this.formatUSDMemo[num] = this.formatUSDMemo[num] || {};

    //console.log('this.formatUSDMemo[num] :: ', this.formatUSDMemo[num]);

    this.formatUSDMemo[num][decimal] = Number(num).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimal,
    });
    return this.formatUSDMemo[num][decimal];
  }

  convertTstampToDaysOrHours(tstampNanos: number) {
    // get total seconds between the times
    let delta = Math.abs(tstampNanos / 1000000 - new Date().getTime()) / 1000;

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.ceil(delta / 60) % 60;

    return `${days ? days + 'd ' : ''} ${!days && hours ? hours + 'h' : ''} ${
      !days && !hours && minutes ? minutes + 'm' : ''
    }`;
  }

  convertTstampToDateOrTime(tstampNanos: number) {
    const date = new Date(tstampNanos / 1e6);
    const currentDate = new Date();
    if (
      date.getDate() != currentDate.getDate() ||
      date.getMonth() != currentDate.getMonth() ||
      date.getFullYear() != currentDate.getFullYear()
    ) {
      return date.toLocaleString('default', { month: 'short', day: 'numeric' });
    }

    return date.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
  }

  /**
   * Converts nanos to BitClout
   * SAMPLE CALL from F/E code nanosToBitClout(this.globalVars.loggedInUser.BalanceNanos, 9)
   * @param {number} nanos
   * @param {number} [maximumFractionDigits]
   * @returns {string}
   * @memberof BitcloutUtilitiesService
   */
  nanosToBitClout(nanos: number, maximumFractionDigits: number): number {
      if (this.nanosToBitCloutMemo[nanos] && this.nanosToBitCloutMemo[nanos][maximumFractionDigits]) {
        return this.nanosToBitCloutMemo[nanos][maximumFractionDigits];
      }

      this.nanosToBitCloutMemo[nanos] = this.nanosToBitCloutMemo[nanos] || {};

      if (!maximumFractionDigits && nanos > 0) {
        // maximumFractionDigits defaults to 3.
        // Set it higher only if we have very small amounts.
        maximumFractionDigits = Math.floor(10 - Math.log10(nanos));
      }

      // Always show at least 2 digits
      if (maximumFractionDigits < 2) {
        maximumFractionDigits = 2;
      }

      // Never show more than 9 digits
      if (maximumFractionDigits > 9) {
        maximumFractionDigits = 9;
      }

      // Always show at least 2 digits
      const minimumFractionDigits = 2;
      const num = nanos / 1e9;
      this.nanosToBitCloutMemo[nanos][maximumFractionDigits] = Number(num).toLocaleString('en-US', {
        style: 'decimal',
        currency: 'USD',
        minimumFractionDigits,
        maximumFractionDigits,
      });
      return this.nanosToBitCloutMemo[nanos][maximumFractionDigits];
  }

  creatorCoinNanosToUSDNaive(creatorCoinNanos: number, coinPriceBitCloutNanos: number, abbreviate: boolean = false): string {
      const usdValue = this.nanosToUSDNumber((creatorCoinNanos / 1e9) * coinPriceBitCloutNanos);
      return abbreviate ? this.abbreviateNumber(usdValue, 2, true) : this.formatUSD(usdValue, 2);
  }

}
