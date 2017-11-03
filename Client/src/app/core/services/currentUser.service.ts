import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class CurrentUserService {

    constructor(private storageService: StorageService) {

    }

    get token(): string {
        return this.storageService.getItem('auth');
    }

    set token(token: string) {
        this.storageService.setItem('auth', token);
    }

    get username() {
        return this.storageService.getItem('username');
    }

    set username(username: string) {
        if (!username) {
            this.storageService.removeItem('username');
        } else {
            this.storageService.setItem('username', username);
        }
    }
}
