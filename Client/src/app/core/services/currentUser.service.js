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
import { StorageService } from './storage.service';
var CurrentUserService = (function () {
    function CurrentUserService(storageService) {
        this.storageService = storageService;
    }
    Object.defineProperty(CurrentUserService.prototype, "token", {
        get: function () {
            var token = this.storageService.getItem('auth');
            return token;
        },
        set: function (token) {
            this.storageService.setItem('auth', token);
        },
        enumerable: true,
        configurable: true
    });
    return CurrentUserService;
}());
CurrentUserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [StorageService])
], CurrentUserService);
export { CurrentUserService };
//# sourceMappingURL=currentUser.service.js.map