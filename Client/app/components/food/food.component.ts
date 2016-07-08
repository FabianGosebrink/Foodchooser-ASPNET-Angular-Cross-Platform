import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodListComponent } from '../foodlists/foodlists.component';
import { FoodListFormComponent } from '../foodListForm/foodListForm.component';

@Component({
    selector: 'food-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FoodListComponent, FoodListFormComponent],
    providers: [FoodDataService, FoodListDataService],
    template: require('./food.component.html')
})

export class FoodComponent {

    constructor() {

    }
}