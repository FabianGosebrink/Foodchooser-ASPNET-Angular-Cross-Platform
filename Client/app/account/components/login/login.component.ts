import { Token } from './../../../shared/models/token';
import { LoginUser } from './../../../shared/models/loginUser';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    loginUser: LoginUser;
    errorMessage: string;

    constructor(private authService: AuthenticationService, private router: Router) {
        this.loginUser = new LoginUser();
    }

    public doLoginUser() {
        this.authService
            .LoginUser(this.loginUser.Username, this.loginUser.Password)
            .subscribe(
            (response: Token) => this.router.navigate(['/home']),
            (error) => {
                console.log(error);
                this.errorMessage = JSON.parse(error._body).error_description;
                this.loginUser.Password = '';
            });
    }
}