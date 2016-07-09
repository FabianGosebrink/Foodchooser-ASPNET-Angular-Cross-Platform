import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from  './components/header/header.component';
import { AuthenticationService } from  './shared/services/authentication.service';
import {  Location} from '@angular/common';

import '../css/custom.css';

@Component({
    selector: 'foodChooser-app',
    directives: [ROUTER_DIRECTIVES, HeaderComponent],
    template: require('./app.component.html')
})

export class AppComponent {

    constructor(public authenticationService: AuthenticationService, private _location: Location) {
       
        _location.go('/home');
    }
} 