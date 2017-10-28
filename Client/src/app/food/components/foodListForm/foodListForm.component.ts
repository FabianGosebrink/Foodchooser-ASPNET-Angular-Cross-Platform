import { Component } from '@angular/core';

import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { FoodList } from './../../../shared/models/foodList';

@Component({
    selector: 'foodListForm-component',
    templateUrl: './foodListForm.component.html'
})

export class FoodListFormComponent {

    list: FoodList;
    errorMessage: string;

    constructor(private foodListDataService: FoodListDataService) {
        this.list = new FoodList();
    }

    public addList() {
        if (this.list.Name) {
            this.foodListDataService
                .addList(this.list.Name)
                .subscribe((response: FoodList) => {
                    this.list = new FoodList();
                },
                error => {
                    console.log(error)
                    this.errorMessage = error.Message;
                });
        }
    }
}
