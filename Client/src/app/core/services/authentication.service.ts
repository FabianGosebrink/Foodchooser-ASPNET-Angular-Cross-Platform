import { Observer } from 'rxjs/Rx';
import { Token } from './../../shared/models/token';
import { CONFIGURATION } from './../../shared/app.constants';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpWrapperService } from './httpWrapper.service';
import { CurrentUserService } from './currentUser.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpWrapperService,
        private currentUserService: CurrentUserService,
        private router: Router) {

    }

    get isAuthenticated(): boolean {
        if (!this.currentUserService.token) {
            return false;
        }
        return true;
    }

    public LoginUser(username: string, password: string): Observable<Token> {
        let body = 'grant_type=password&username=' + username + '&password=' + password,
            options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

        return Observable.create((observer: Observer<Response>) => {
            this.http.post(CONFIGURATION.baseUrls.server + 'token', body, options)
                .map((response: any) => <Token>response.json())
                .subscribe((tokenData: any) => {
                    this.currentUserService.token = tokenData.access_token;
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
