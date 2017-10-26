import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';

import { CONFIGURATION } from './../../shared/app.constants';
import { Token } from './../../shared/models/token';
import { CurrentUserService } from './currentUser.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http,
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

        const options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

        return Observable.create((observer: Observer<Token>) => {
            this.http.post(CONFIGURATION.baseUrls.server + 'connect/token', body, options)
                .map((response: any) => <Token>response.json())
                .subscribe((tokenData: Token) => {
                    this.currentUserService.token = tokenData.access_token;
                    this.currentUserService.username = username;
                    observer.next(tokenData);
                }, (error) => observer.error(error),
                () => observer.complete());
        });
    }

    public LogoutUser() {
        this.currentUserService.token = null;
        this.router.navigate(['/home']);
    }

    public RegisterUser = (username: string, email: string, password: string, confirmPassword: string): Observable<any> => {

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
