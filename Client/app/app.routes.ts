import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'login', loadChildren: './account/account.module#AccountModule' },
  { path: 'foodlists', loadChildren: './food/food.module#FoodModule' },
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, { useHash: true });
