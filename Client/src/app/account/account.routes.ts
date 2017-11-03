import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const accountRoutes: Routes = [
    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

export const AccountRoutes = RouterModule.forChild(accountRoutes);
