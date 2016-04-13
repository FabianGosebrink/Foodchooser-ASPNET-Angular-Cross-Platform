import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES, RouteParams, Router } from 'angular2/router';
import { LoginUser } from '../../models/LoginUser';
import { Token } from '../../models/Token';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    selector: 'login-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: 'app/components/login/login.component.html'
})

export class LoginComponent {

    loginUser: LoginUser;
    errorMessage: string;

    constructor(private _authService: AuthenticationService, private _router: Router) {
        this.loginUser = new LoginUser();
    }

    public doLoginUser() {
        this._authService
            .LoginUser(this.loginUser.Username, this.loginUser.Password)
            .subscribe(
            (response: Token) => this._router.navigate(['Home']),
            (error) => { 
                console.log(error); 
                this.errorMessage = JSON.parse(error._body).error_description;
                this.loginUser.Password = "";
            });
    }
}