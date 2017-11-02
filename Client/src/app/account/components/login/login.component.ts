import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../core/services/authentication.service';
import { LoginUser } from './../../../shared/models/loginUser';
import { Token } from './../../../shared/models/token';

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

    doLoginUser() {
        this.authService
            .loginUser(this.loginUser.Username, this.loginUser.Password)
            .subscribe(
            (response: Token) => this.router.navigate(['/home']),
            (error: any) => {
                console.log(error);
                this.errorMessage = JSON.parse(error._body).error_description;
                this.loginUser.Password = '';
            });
    }

    redirectTo(target: string, $event: any) {
        $event.preventDefault();
        this.router.navigate([target]);
    }
}
