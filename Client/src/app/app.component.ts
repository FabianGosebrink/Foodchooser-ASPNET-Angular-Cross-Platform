import { Component } from '@angular/core';

import { AuthenticationService } from './core/services/authentication.service';

@Component({
    selector: 'foodChooser-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(public authenticationService: AuthenticationService) { }
}
