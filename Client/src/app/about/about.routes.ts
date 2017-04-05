import { AboutComponent } from './components/about/about.component';
import { Routes, RouterModule } from '@angular/router';

const aboutRoutes: Routes = [
    { path: '', component: AboutComponent }
];

export const AboutRoutes = RouterModule.forChild(aboutRoutes);
