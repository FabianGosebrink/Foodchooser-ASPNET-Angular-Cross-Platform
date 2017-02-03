import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent }
];

export const HomeRoutes = RouterModule.forChild(appRoutes);
