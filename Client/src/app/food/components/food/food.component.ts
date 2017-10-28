import { Component, OnInit } from '@angular/core';

import { FoodListDataService } from '../../../core/services/foodList-data.service';
import { FoodList } from '../../../shared/models/foodList';

@Component({
    selector: 'food-component',
    templateUrl: './food.component.html'
})

export class FoodComponent implements OnInit {

    lists: FoodList[] = [];

    constructor(private foodListDataService: FoodListDataService) { }

    addFood(foodListname: string) {
        this.foodListDataService
            .addList(foodListname)
            .map((response: any) => response.value)
            .subscribe((addedList: FoodList) => {
                this.lists.push(addedList);
            });
    }

    public ngOnInit(): void {
        this.foodListDataService
            .getAllLists()
            .map((response: any) => response.value)
            .subscribe((lists: FoodList[]) => {
                this.lists = lists;
            });
    }
}
