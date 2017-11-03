import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CONFIGURATION } from './../../shared/app.constants';
import { Token } from './../../shared/models/token';
import { CurrentUserService } from './currentUser.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient,
        private currentUserService: CurrentUserService,
        private router: Router) {
    }

    get isAuthenticated(): boolean {
        return !!this.currentUserService.token;
    }

    loginUser(username: string, password: string): Observable<Token> {
        const clientId = 'client_id=' + CONFIGURATION.authConfig.CLIENT_ID;
        const grantType = 'grant_type=' + CONFIGURATION.authConfig.GRANT_TYPE;
        const usernameForBody = 'username=' + username;
        const passwordForBody = 'password=' + password;
        const scope = 'scope=' + CONFIGURATION.authConfig.SCOPE;

        const body = clientId.concat('&', grantType, '&', usernameForBody, '&', passwordForBody, '&', scope);

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return Observable.create((observer: Observer<Token>) => {
            this.http.post<Token>(CONFIGURATION.baseUrls.server + 'connect/token', body, options)
                .subscribe((tokenData: Token) => {
                    this.currentUserService.token = tokenData.access_token;
                    this.currentUserService.username = username;
                    observer.next(tokenData);
                }, (error) => observer.error(error),
                () => observer.complete());
        });
    }

    logoutUser() {
        this.currentUserService.token = '';
        this.router.navigate(['/home']);
    }

    registerUser(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
        let registerData = {
            Email: email,
            Username: username,
            Password: password,
            ConfirmPassword: confirmPassword
        };

        return this.http.post(CONFIGURATION.baseUrls.server + CONFIGURATION.baseUrls.apiUrl + 'account/register',
            JSON.stringify(registerData));
    }
}
