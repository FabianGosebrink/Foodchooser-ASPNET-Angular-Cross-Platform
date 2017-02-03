import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';

const accountRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

export const AccountRoutes = RouterModule.forChild(accountRoutes);
