import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodListComponent } from '../foodlists/foodlists.component';
import { FoodListFormComponent } from '../foodListForm/foodListForm.component';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

@Component({
    selector: 'food-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FoodListComponent, FoodListFormComponent],
    providers: [FoodDataService, FoodListDataService],
    template: require('./food.component.html')
})

@NeedsAuthentication()
export class FoodComponent {

    constructor() {

    }
}