import { Component } from '@angular/core';
import { AuthenticationService } from  './shared/services/authentication.service';

@Component({
    selector: 'foodChooser-app',
    template: require('./app.component.html')
})

export class AppComponent {
    constructor(public authenticationService: AuthenticationService) {
    }
}
