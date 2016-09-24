import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from  './components/home/home.component';
import { FoodListComponent } from  './components/foodlists/foodLists.component';
import { FoodComponent } from  './components/food/food.component';
import { FoodListDetails } from  './components/foodListDetails/foodListDetails.component';
import { LoginComponent } from  './components/login/login.component';
import { RegisterComponent } from  './components/register/register.component';
import { AboutComponent } from  './components/about/about.component';
import { HeaderComponent } from  './components/header/header.component';
import { NeedsAuthentication } from './decorators/needsAuthentication';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });