import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'register-component',
    templateUrl: './register.component.html'
})


export class RegisterComponent {

    registerUser: any;
    errorMessage: string;
    successMessage: string;

    constructor(private authService: AuthenticationService, private router: Router) {
        this.registerUser = {};
    }

    doRegisterUser() {
        this.errorMessage = '';
        this.successMessage = '';

        this.authService
            .RegisterUser(
            this.registerUser.Username,
            this.registerUser.Email,
            this.registerUser.Password,
            this.registerUser.ConfirmPassword
            )
            .subscribe((response: any) => {
                this.successMessage = 'You have been registered. Please login.';
            }, (error) => {

                let errorObject = error._body;
                let parsedErrorObject = JSON.parse(errorObject).ModelState;

                for (let propertyName in parsedErrorObject) {
                    this.errorMessage += parsedErrorObject[propertyName][0];
                }
            });
    }

    redirectTo(target: string, $event: any) {
        $event.preventDefault();
        this.router.navigate([target]);
    }
}