import { Component } from '@angular/core';

import { AuthenticationService } from './../../../core/services/authentication.service';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    constructor(public authenticationService: AuthenticationService) { }

    public logout() {
        this.authenticationService.logoutUser();
    }
}
