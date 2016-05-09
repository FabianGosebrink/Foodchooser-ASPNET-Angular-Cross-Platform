import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from '../services/currentUser.service';

@Injectable()
export class HttpWrapperService {
    constructor(private _http: Http, private _currentUserService: CurrentUserService) {

    }

    public get = (url: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);

        return this._http.get(url, options);
    };

    public post = (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.post(url, body, options);
    };

    public put = (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.put(url, body, options);
    }

    public delete = (url: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.delete(url, options);
    }

    public patch = (url: string, body: string, options?: RequestOptionsArgs): Observable<Response> => {
        options = this.prepareOptions(options);
        return this._http.patch(url, body, options);
    }

    private prepareOptions(options: RequestOptionsArgs): RequestOptionsArgs {
        let token: string = this._currentUserService.token;

        options = options || {};

        if (!options.headers) {
            options.headers = new Headers();
        }

        if (token) {
            options.headers.append('Authorization', 'Bearer ' + token);
        }

        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        return options;
    }
}