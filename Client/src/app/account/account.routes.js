import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
var accountRoutes = [
    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
export var AccountRoutes = RouterModule.forChild(accountRoutes);
//# sourceMappingURL=account.routes.js.map