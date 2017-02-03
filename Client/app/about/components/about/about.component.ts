import { FoodDataService } from './../../../core/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem';
import { Component } from '@angular/core';

@Component({
    selector: 'about-component',
    templateUrl: './about.component.html'
})


export class AboutComponent {

    randomFood: FoodItem;
    errorMessage: string;

    constructor(private foodDataService: FoodDataService) {

    }

    public ngOnInit() {
        this.foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {
                this.randomFood = response;
            }, error => {
                if (error.status === 404) {
                    this.errorMessage = 'No food found :-(';
                } else {
                    this.errorMessage = error;
                }
            });
    }
}