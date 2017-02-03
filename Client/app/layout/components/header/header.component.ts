import { AuthenticationService } from './../../../core/services/authentication.service';
import { Component } from '@angular/core';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html'
})


export class HeaderComponent {

    constructor(public authenticationService: AuthenticationService) {

    }

    public logout() {
        this.authenticationService.LogoutUser();
    }
} 