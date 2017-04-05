var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var PlatformInformationService = (function () {
    function PlatformInformationService() {
        this.guessPlatform();
    }
    Object.defineProperty(PlatformInformationService.prototype, "isMobile", {
        get: function () {
            return this._isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationService.prototype, "isDesktop", {
        get: function () {
            return this._isDesktop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformInformationService.prototype, "isWeb", {
        get: function () {
            return this._isWeb;
        },
        enumerable: true,
        configurable: true
    });
    PlatformInformationService.prototype.guessPlatform = function () {
        this._isMobile = !!window.cordova;
        this._isDesktop = window.navigator.userAgent.match(/Electron/) !== null;
        this._isWeb = !(this._isMobile || this._isDesktop);
        console.log('mobile: ' + this._isMobile);
        console.log('desktop: ' + this._isDesktop);
        console.log('web: ' + this._isWeb);
    };
    return PlatformInformationService;
}());
PlatformInformationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PlatformInformationService);
export { PlatformInformationService };
//# sourceMappingURL=platformInformation.service.js.map