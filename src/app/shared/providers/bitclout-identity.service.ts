import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { Observable,
         Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcloutIdentityService {

  // Requests that were sent before the iframe initialized
  private pendingRequests = [];

  // All outbound request promises we still need to resolve
  // TODO: Add this to CloutScript (Type outboundRequests)
  private outboundRequests: {[key: string]: Subject<unknown>} = {};

  // The currently active identity window
  private identityWindow: any;
  private identityWindowSubject: any;

  // The URL of the identity service
  identityServiceURL: string  = environment.bitclout.identityService;
  sanitizedIdentityServiceURL;

  // Importing identities
  importingIdentities: any[] | undefined;

  // User data
  identityServiceUsers: any;
  identityServicePublicKeyAdded: string | undefined;

  private initialized = false;
  private iframe: any;

  // Wait for storageGranted broadcast
  storageGranted = new Subject();

  // Using testnet or mainnet
  isTestnet = false;

  constructor(private sanitizer: DomSanitizer) {
    window.addEventListener('message', event => this.handleMessage(event));
    this.sanitizedIdentityServiceURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.identityServiceURL}/embed?v=2`
    );
  }

    // Launch a new identity window

  launch(path?: string, params?: { publicKey?: string; tx?: string; accessLevelRequest?: string }): Observable<any> {
    //console.log('identity window params :: ', params);
    let url = this.identityServiceURL as string;
    if (path) {
      url += path;
    }

    let httpParams = new HttpParams();
    if (this.isTestnet) {
      httpParams = httpParams.append('testnet', 'true');
    }

    if (params?.publicKey) {
      httpParams = httpParams.append('publicKey', params.publicKey);
    }

    if (params?.tx) {
      httpParams = httpParams.append('tx', params.tx);
    }

    if (params?.accessLevelRequest) {
      httpParams = httpParams.append('accessLevelRequest', params.accessLevelRequest);
    }

    const paramsStr = httpParams.toString();
    if (paramsStr) {
      url += `?${paramsStr}`;
    }

    // center the window
    const h = 1000;
    const w = 800;
    const y = window.outerHeight / 2 + window.screenY - h / 2;
    const x = window.outerWidth / 2 + window.screenX - w / 2;

    this.identityWindow = window.open(url, '', `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    this.identityWindowSubject = new Subject();

    return this.identityWindowSubject;
  }

  // Outgoing messages

  burn(payload: {
    accessLevel: number;
    accessLevelHmac: string;
    encryptedSeedHex: string;
    unsignedHashes: string[];
  }): Observable<any> {
    return this.send('burn', payload);
  }

  sign(payload: {
    accessLevel: number;
    accessLevelHmac: string;
    encryptedSeedHex: string;
    transactionHex: string;
  }): Observable<any> {
    return this.send('sign', payload);
  }

  decrypt(payload: {
    accessLevel: number;
    accessLevelHmac: string;
    encryptedSeedHex: string;
    encryptedHexes: string[];
  }): Observable<any> {
    return this.send('decrypt', payload);
  }

  jwt(payload: { accessLevel: number; accessLevelHmac: string; encryptedSeedHex: string }): Observable<any> {
    return this.send('jwt', payload);
  }

  info(): Observable<any> {
    return this.send('info', {});
  }

  // Helpers

  identityServiceParamsForKey(publicKey: string) {
    const { encryptedSeedHex, accessLevel, accessLevelHmac } = this.identityServiceUsers[publicKey];
    return { encryptedSeedHex, accessLevel, accessLevelHmac };
  }

  // Incoming messages

  private handleInitialize(event: MessageEvent) {
    if (!this.initialized) {
      this.initialized = true;
      this.iframe = document.getElementById('identity');
      for (const request of this.pendingRequests) {
        this.postMessage(request);
      }
      this.pendingRequests = [];
    }

    // acknowledge, provides hostname data
    this.respond(event.source as Window, event.data.id, {});
  }

  private handleStorageGranted() {
    this.storageGranted.next(true);
    this.storageGranted.complete();
  }

  private handleLogin(payload: any) {
    this.identityWindow.close();
    this.identityWindow = null;

    this.identityWindowSubject.next(payload);
    this.identityWindowSubject.complete();
    this.identityWindowSubject = null;
  }

  private handleImport(id: string) {
    this.respond(this.identityWindow, id, { identities: this.importingIdentities });
  }

  private handleInfo(id: string) {
    this.respond(this.identityWindow, id, {});
  }

  // Message handling

  private handleMessage(event: MessageEvent) {
    const { data } = event;
    const { service, method } = data;

    if (service !== 'identity') {
      return;
    }

    // Methods are present on incoming requests but not responses
    if (method) {
      this.handleRequest(event);
    } else {
      this.handleResponse(event);
    }
  }

  private handleRequest(event: MessageEvent) {
    const {
      data: { id, method, payload },
    } = event;

    if (method === 'initialize') {
      this.handleInitialize(event);
    } else if (method === 'storageGranted') {
      this.handleStorageGranted();
    } else if (method === 'login') {
      this.handleLogin(payload);
    } else if (method === 'import') {
      this.handleImport(id);
    } else if (method === 'info') {
      this.handleInfo(id);
    } else {
      console.error('Unhandled identity request');
      console.error(event);
    }
  }

  private handleResponse(event: MessageEvent) {
    const {
      data: { id, payload },
    } = event;

    const req: any = this.outboundRequests[id];
    req.next(payload);
    req.complete();
    delete this.outboundRequests[id];
  }

  // Send a new message and expect a response
  private send(method: string, payload: any) {
    const req = {
      id: uuid(),
      method,
      payload,
      service: 'identity',
    };

    const subject = new Subject();
    this.postMessage(req);
    this.outboundRequests ? this.outboundRequests[req.id] = subject: null;

    return subject;
  }

  private postMessage(req: any) {
    if (this.initialized) {
      this.iframe.contentWindow.postMessage(req, '*');
    } else {
      this.pendingRequests.push(<never>req);
    }
  }

  // Respond to a received message
  private respond(window: Window, id: string, payload: any): void {
    window.postMessage({ id, service: 'identity', payload }, '*');
  }
}
