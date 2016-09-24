import { Component } from '@angular/core';
import { LoginUser } from '../../models/LoginUser';
import { Token } from '../../models/Token';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'login-component',
    template: require('./login.component.html')
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
            (response: Token) => this._router.navigate(['/home']),
            (error) => { 
                console.log(error); 
                this.errorMessage = JSON.parse(error._body).error_description;
                this.loginUser.Password = "";
            });
    }
}