import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Headers, RequestOptions, Response } from '@angular/http';
import { CONFIGURATION } from '../app.constants';
import { Token } from '../../models/Token';
import { Observable } from 'rxjs/Observable';
import { HttpWrapperService } from './httpWrapper.service';
import { CurrentUserService } from './currentUser.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    constructor(private _http: HttpWrapperService,
        private _currentUserService: CurrentUserService,
        private _router: Router) {

    }

    get isAuthenticated(): boolean {
        if (!this._currentUserService.token) {
            return false;
        }
        return true;
    }

    public LoginUser(username: string, password: string): Observable<Token> {
        let body = 'grant_type=password&username=' + username + '&password=' + password,
            options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

        return Observable.create((observer) => {
            this._http.post(CONFIGURATION.baseUrls.server + 'token', body, options)
                .map(response => <Token>response.json())
                .subscribe((tokenData) => {
                    this._currentUserService.token = tokenData.access_token;
                    observer.next(tokenData);
                }, (error) => observer.error(error),
                () => observer.complete());
        });
    }

    public LogoutUser() {
        this._currentUserService.token = null;
        this._router.navigate(['/home']);
    }

    public RegisterUser = (username: string, email: string, password: string, confirmPassword: string): Observable<any> => {

        let registerData = {
            Email: email,
            Username: username,
            Password: password,
            ConfirmPassword: confirmPassword
        }

        return this._http.post(CONFIGURATION.baseUrls.server + CONFIGURATION.baseUrls.apiUrl + 'account/register', JSON.stringify(registerData));
    }
}
