import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class CurrentUserService {

    constructor(private storageService: StorageService) {

    }

    public get token(): string {
        let token = this.storageService.getItem('auth');

        return token;
    }

    public set token(token: string) {
        this.storageService.setItem('auth', token);
    }
}
