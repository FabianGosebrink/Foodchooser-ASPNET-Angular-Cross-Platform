import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AuthenticationService } from  '../../shared/services/authentication.service';

@Component({
    selector: 'header-component',
    directives: [ROUTER_DIRECTIVES],
    template: require('./header.component.html')
})


export class HeaderComponent {

    constructor(public authenticationService: AuthenticationService) {

    }
    
     public logout() {
        this.authenticationService.LogoutUser();
    }
} 