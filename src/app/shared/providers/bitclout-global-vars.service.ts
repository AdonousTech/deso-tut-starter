import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IUser,
         ILoggedInUserObservableResult,
         IBalanceEntryResponse } from '@adonoustech/cloutscript-core';
import { BitcloutBackendApiHelperService } from './bitclout-backend-api-helper.service';
import { BitcloutIdentityService } from './bitclout-identity.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcloutGlobalVarsService {

  // See https://github.com/bitclout/frontend/blob/6944331db5773200c045cd23501d6afafd01d1f1/src/app/global-vars.service.ts#L45
  static DEFAULT_NANOS_PER_USD_EXCHANGE_RATE = 1e9;

  // The coin balance and user profiles of the coins the the user
  // hodls and the users who hodl him.
  youHodlMap: { [k: string]: IBalanceEntryResponse } = {};

  // We track logged-in state
  loggedInUser: IUser | undefined;
  userList: IUser[] = [];

  loggedInUserObservable: Observable<ILoggedInUserObservableResult> | undefined;
  loggedInUserObservers = [] as Observer<ILoggedInUserObservableResult>[];

  satoshisPerBitCloutExchangeRate: number | undefined;
  nanosPerUSDExchangeRate: number = BitcloutGlobalVarsService.DEFAULT_NANOS_PER_USD_EXCHANGE_RATE;
  NanosSold: number | undefined;

  // This is the USD to Bitcoin exchange rate according to external
  // sources.
  usdPerBitcoinExchangeRate: number | undefined;
  defaultFeeRateNanosPerKB: number | undefined;

  nodeInfo: any;
  // The API node we connect to
  localNode: string = '';
  // Whether or not the node is running on the testnet or mainnet.
  isTestnet = false;

  feeRateBitCloutPerKB = 0.0;

  requestingStorageAccess: boolean | undefined;

  constructor(private backendApi: BitcloutBackendApiHelperService,
              private identityService: BitcloutIdentityService,
              private sanitizer: DomSanitizer) { }

  /**
   *https://github.com/bitclout/frontend/blob/6944331db5773200c045cd23501d6afafd01d1f1/src/app/global-vars.service.ts#L663
   *
   * @private
   * @memberof BitcloutGlobalVarsService
   */
  private _setUpLoggedInUserObservable() {
    this.loggedInUserObservable = new Observable((observer) => {
      this.loggedInUserObservers.push(observer);
    });
  }

  /**
   * https://github.com/bitclout/frontend/blob/6944331db5773200c045cd23501d6afafd01d1f1/src/app/global-vars.service.ts#L578
   *
   * @param passedFunc
   * @param [expirationSecs]
   * @returns
   * @memberof BitcloutGlobalVarsService
   */
  _globopoll(passedFunc: any, expirationSecs?: any): any {
    let result: boolean;
    const startTime = new Date();
    const interval = setInterval(() => {
      if (passedFunc()) {
        result = false;
      }
      if (expirationSecs && new Date().getTime() - startTime.getTime() > expirationSecs * 1000) {
        result = true;
      }

      if (result) {
        return true;
      } else {
        clearInterval(interval);
        return false;
      }

    }, 1000);
  }


  /**
   * Init User
   *
   * @param UserList
   * @memberof BitcloutGlobalVarsService
   */
  Init(UserList: IUser[]) {
    // Set up logged in user observable
    this._setUpLoggedInUserObservable();

    this.userList = UserList;
    this.satoshisPerBitCloutExchangeRate = 0;
    this.nanosPerUSDExchangeRate = BitcloutGlobalVarsService.DEFAULT_NANOS_PER_USD_EXCHANGE_RATE;
    this.usdPerBitcoinExchangeRate = 10000;
    this.defaultFeeRateNanosPerKB = 0.0;

    //this.localNode = this.backendApi.GetStorage(this.backendApi.LastLocalNodeKey)
    this.localNode = environment.bitclout.node; // force app to use specific node

    if (!this.localNode) {
      const hostname = (window as any).location.hostname;
      this.localNode = hostname;
    }

    this.backendApi.SetStorage(this.backendApi.LastLocalNodeKey, this.localNode);

    let identityServiceURL = this.backendApi.GetStorage(this.backendApi.LastIdentityServiceKey);
    if (!identityServiceURL) {
      identityServiceURL = environment.bitclout.identityService;
      this.backendApi.SetStorage(this.backendApi.LastIdentityServiceKey, identityServiceURL);
    }

    this.identityService.identityServiceURL = identityServiceURL;
    this.identityService.sanitizedIdentityServiceURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${identityServiceURL}/embed?v=2`
    );

    this._globopoll(() => {
      if (!this.defaultFeeRateNanosPerKB) {
        return false;
      }
      this.feeRateBitCloutPerKB = this.defaultFeeRateNanosPerKB / 1e9;
      return true;
    });
  }

}
