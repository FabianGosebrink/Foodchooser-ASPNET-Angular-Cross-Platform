import { Component } from '@angular/core';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodListComponent } from '../foodlists/foodlists.component';
import { FoodListFormComponent } from '../foodListForm/foodListForm.component';

@Component({
    selector: 'food-component',
    providers: [FoodDataService, FoodListDataService],
    template: require('./food.component.html')
})

export class FoodComponent {

    constructor() {

    }
}