import { provideRouter, RouterConfig }  from '@angular/router';
import { HomeComponent } from  './components/home/home.component';
import { FoodListComponent } from  './components/foodlists/foodLists.component';
import { FoodComponent } from  './components/food/food.component';
import { FoodListDetails } from  './components/foodListDetails/foodListDetails.component';
import { LoginComponent } from  './components/login/login.component';
import { RegisterComponent } from  './components/register/register.component';
import { AboutComponent } from  './components/about/about.component';
import { HeaderComponent } from  './components/header/header.component';
import { NeedsAuthentication } from './decorators/needsAuthentication';

const routes: RouterConfig = [
    { path: '', component: HomeComponent },
    { path: 'foodLists', component: FoodComponent, canActivate: [NeedsAuthentication] },
    { path: 'foodLists/:id', component: FoodListDetails, canActivate: [NeedsAuthentication] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    NeedsAuthentication
];