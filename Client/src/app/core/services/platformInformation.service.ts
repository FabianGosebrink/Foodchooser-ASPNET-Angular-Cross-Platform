import { Injectable } from '@angular/core';

declare let window: any;

@Injectable()
export class PlatformInformationService {
    private _isMobile: boolean;
    private _isDesktop: boolean;
    private _isWeb: boolean;

    get isMobile(): boolean {
        return this._isMobile;
    }

    get isDesktop(): boolean {
        return this._isDesktop;
    }

    get isWeb(): boolean {
        return this._isWeb;
    }

    constructor() {
        this.guessPlatform();
    }

    private guessPlatform(): void {
        this._isMobile = !!window.cordova;
        this._isDesktop = window.navigator.userAgent.match(/Electron/) !== null;
        this._isWeb = !(this._isMobile || this._isDesktop);
        console.log('mobile: ' + this._isMobile);
        console.log('desktop: ' + this._isDesktop);
        console.log('web: ' + this._isWeb);
    }
}
