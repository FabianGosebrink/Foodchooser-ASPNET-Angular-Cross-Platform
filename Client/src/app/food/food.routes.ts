import { NeedsAuthentication } from './../shared/decorators/needsAuthentication';
import { FoodListDetails } from './components/foodListDetails/foodListDetails.component';
import { FoodComponent } from './components/food/food.component';
import { Routes, RouterModule } from '@angular/router';

const foodRoutes: Routes = [
    { path: '', component: FoodComponent, canActivate: [NeedsAuthentication] },
    { path: ':foodId', component: FoodListDetails, canActivate: [NeedsAuthentication] },
];

export const FoodRoutes = RouterModule.forChild(foodRoutes);
