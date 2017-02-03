import { AuthenticationService } from './core/services/authentication.service';
import { Component } from '@angular/core';

@Component({
    selector: 'foodChooser-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(public authenticationService: AuthenticationService) { }
}
