var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var RegisterComponent = (function () {
    function RegisterComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.registerUser = {};
    }
    RegisterComponent.prototype.doRegisterUser = function () {
        var _this = this;
        this.errorMessage = '';
        this.successMessage = '';
        this.authService
            .RegisterUser(this.registerUser.Username, this.registerUser.Email, this.registerUser.Password, this.registerUser.ConfirmPassword)
            .subscribe(function (response) {
            _this.successMessage = 'You have been registered. Please login.';
        }, function (error) {
            var errorObject = error._body;
            var parsedErrorObject = JSON.parse(errorObject).ModelState;
            for (var propertyName in parsedErrorObject) {
                _this.errorMessage += parsedErrorObject[propertyName][0];
            }
        });
    };
    RegisterComponent.prototype.redirectTo = function (target, $event) {
        $event.preventDefault();
        this.router.navigate([target]);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Component({
        selector: 'register-component',
        templateUrl: './register.component.html'
    }),
    __metadata("design:paramtypes", [AuthenticationService, Router])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map