var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LoginUser } from './../../../shared/models/loginUser';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
export var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loginUser = new LoginUser();
    }
    LoginComponent.prototype.doLoginUser = function () {
        var _this = this;
        this.authService
            .LoginUser(this.loginUser.Username, this.loginUser.Password)
            .subscribe(function (response) { return _this.router.navigate(['/home']); }, function (error) {
            console.log(error);
            _this.errorMessage = JSON.parse(error._body).error_description;
            _this.loginUser.Password = '';
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'login-component',
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [AuthenticationService, Router])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=login.component.js.map