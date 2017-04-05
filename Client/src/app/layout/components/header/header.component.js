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
var HeaderComponent = (function () {
    function HeaderComponent(authenticationService) {
        this.authenticationService = authenticationService;
    }
    HeaderComponent.prototype.logout = function () {
        this.authenticationService.LogoutUser();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    Component({
        selector: 'header-component',
        templateUrl: './header.component.html'
    }),
    __metadata("design:paramtypes", [AuthenticationService])
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map