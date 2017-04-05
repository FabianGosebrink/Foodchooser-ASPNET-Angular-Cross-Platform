import { NeedsAuthentication } from './../shared/decorators/needsAuthentication';
import { FoodListDetails } from './components/foodListDetails/foodListDetails.component';
import { FoodComponent } from './components/food/food.component';
import { RouterModule } from '@angular/router';
var foodRoutes = [
    { path: '', component: FoodComponent, canActivate: [NeedsAuthentication] },
    { path: ':foodId', component: FoodListDetails, canActivate: [NeedsAuthentication] },
];
export var FoodRoutes = RouterModule.forChild(foodRoutes);
//# sourceMappingURL=food.routes.js.map