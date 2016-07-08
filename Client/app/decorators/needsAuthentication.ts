import { CanActivate, Router } from '@angular/router';
import { Injectable  } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';

@Injectable()
export class NeedsAuthentication implements CanActivate {
    constructor(private _storeageService: StorageService, private _router: Router) {

    }
    canActivate() {
        if (this._storeageService.getItem('auth')) {
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    }
}