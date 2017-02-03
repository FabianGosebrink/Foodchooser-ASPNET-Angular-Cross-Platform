import { Observable } from 'rxjs/Observable';

export interface ICameraService {
    getPhoto(): Observable<string>;
}
