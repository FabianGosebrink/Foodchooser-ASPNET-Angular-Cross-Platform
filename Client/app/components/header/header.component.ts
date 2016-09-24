import { Component } from '@angular/core';
import { AuthenticationService } from  '../../shared/services/authentication.service';

@Component({
    selector: 'header-component',
    template: require('./header.component.html')
})


export class HeaderComponent {

    constructor(public authenticationService: AuthenticationService) {

    }
    
     public logout() {
        this.authenticationService.LogoutUser();
    }
} 