import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodItem } from '../../models/foodItem';

@Component({
    selector: 'about-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FoodDataService],
    templateUrl: 'app/components/about/about.component.html'
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