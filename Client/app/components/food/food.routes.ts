import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from  '../food/food.component';
import { FoodListDetails } from  '../foodListDetails/foodListDetails.component';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

const appRoutes: Routes = [
    { path: 'foodLists', component: FoodComponent, canActivate: [NeedsAuthentication] },
    { path: 'foodLists/:id', component: FoodListDetails, canActivate: [NeedsAuthentication] },
];

export const appRoutingProviders: any[] = [

];

export const foodRouting = RouterModule.forRoot(appRoutes, { useHash: true });