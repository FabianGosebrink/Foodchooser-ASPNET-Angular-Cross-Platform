import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    selector: 'register-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: 'app/components/register/register.component.html'
})


export class RegisterComponent {

    registerUser: any;
    errorMessage: string;
    successMessage: string;

    constructor(private _authService: AuthenticationService) {
        this.registerUser = {};
    }

    doRegisterUser() {

        this._authService
            .RegisterUser(
            this.registerUser.Username,
            this.registerUser.Email,
            this.registerUser.Password,
            this.registerUser.ConfirmPassword
            )
            .subscribe((response: any) => {
                this.successMessage = 'You have been registered. Please login.';
            }, (error) => {
                console.log(error);
                this.errorMessage = JSON.parse(error._body).error_description;
            });

    }
}