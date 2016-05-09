import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { HomeComponent } from  './components/home/home.component';
import { FoodListComponent } from  './components/foodlists/foodLists.component';
import { FoodComponent } from  './components/food/food.component';
import { FoodListDetails } from  './components/foodListDetails/foodListDetails.component';
import { LoginComponent } from  './components/login/login.component';
import { RegisterComponent } from  './components/register/register.component';
import { AboutComponent } from  './components/about/about.component';
import { HeaderComponent } from  './components/header/header.component';
import { AuthenticationService } from  './shared/services/authentication.service';

@Component({
    selector: 'foodChooser-app',
    directives: [ROUTER_DIRECTIVES, HeaderComponent],
    templateUrl: 'app/app.component.html'
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/foodLists', name: 'FoodLists', component: FoodComponent },
    { path: '/foodLists/:id', name: 'FoodListDetails', component: FoodListDetails },
    { path: '/register', name: 'Register', component: RegisterComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/about', name: 'About', component: AboutComponent }
])

export class AppComponent {

    constructor(public authenticationService: AuthenticationService) {

    }
} 