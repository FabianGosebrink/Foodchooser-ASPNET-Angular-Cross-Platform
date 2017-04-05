import { RouterModule } from '@angular/router';
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'foodlists', loadChildren: './food/food.module#FoodModule' },
];
export var AppRoutes = RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routes.js.map