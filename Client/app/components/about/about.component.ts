import { Component } from '@angular/core';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodItem } from '../../models/foodItem';

@Component({
    selector: 'about-component',
    providers: [FoodDataService],
    template: require('./about.component.html')
})


export class AboutComponent {

    randomFood: FoodItem;
    errorMessage: string;

    constructor(private _foodDataService: FoodDataService) {

    }

    public ngOnInit() {
        this._foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {
                this.randomFood = response;
            }, error => {
                if (error.status == 404) {
                    this.errorMessage = "No food found :-(";
                } else {
                    this.errorMessage = error;
                }
            });
    }
}