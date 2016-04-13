import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodListComponent } from '../foodlists/foodlists.component';
import { FoodListFormComponent } from '../foodListForm/foodListForm.component';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

@Component({
    selector: 'food-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FoodListComponent, FoodListFormComponent],
    providers: [FoodDataService, FoodListDataService],
    templateUrl: 'app/components/food/food.component.html'
})

@NeedsAuthentication()
export class FoodComponent {

    constructor() {

    }
}