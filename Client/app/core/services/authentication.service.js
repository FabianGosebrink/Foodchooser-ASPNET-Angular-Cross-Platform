var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CONFIGURATION } from './../../shared/app.constants';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpWrapperService } from './httpWrapper.service';
import { CurrentUserService } from './currentUser.service';
import { Router } from '@angular/router';
export var AuthenticationService = (function () {
    function AuthenticationService(http, currentUserService, router) {
        var _this = this;
        this.http = http;
        this.currentUserService = currentUserService;
        this.router = router;
        this.RegisterUser = function (username, email, password, confirmPassword) {
            var registerData = {
                Email: email,
                Username: username,
                Password: password,
                ConfirmPassword: confirmPassword
            };
            return _this.http.post(CONFIGURATION.baseUrls.server + CONFIGURATION.baseUrls.apiUrl + 'account/register', JSON.stringify(registerData));
        };
    }
    Object.defineProperty(AuthenticationService.prototype, "isAuthenticated", {
        get: function () {
            if (!this.currentUserService.token) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.LoginUser = function (username, password) {
        var _this = this;
        var body = 'grant_type=password&username=' + username + '&password=' + password, options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
        return Observable.create(function (observer) {
            _this.http.post(CONFIGURATION.baseUrls.server + 'token', body, options)
                .map(function (response) { return response.json(); })
                .subscribe(function (tokenData) {
                _this.currentUserService.token = tokenData.access_token;
                observer.next(tokenData);
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    AuthenticationService.prototype.LogoutUser = function () {
        this.currentUserService.token = null;
        this.router.navigate(['/home']);
    };
    AuthenticationService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [HttpWrapperService, CurrentUserService, Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
//# sourceMappingURL=authentication.service.js.map