var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { StorageService } from './../../core/services/storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
export var NeedsAuthentication = (function () {
    function NeedsAuthentication(_storeageService, _router) {
        this._storeageService = _storeageService;
        this._router = _router;
    }
    NeedsAuthentication.prototype.canActivate = function () {
        if (this._storeageService.getItem('auth')) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    };
    NeedsAuthentication = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [StorageService, Router])
    ], NeedsAuthentication);
    return NeedsAuthentication;
}());
//# sourceMappingURL=needsAuthentication.js.map