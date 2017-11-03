import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';

const aboutRoutes: Routes = [
    { path: '', component: AboutComponent }
];

export const AboutRoutes = RouterModule.forChild(aboutRoutes);
