import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodItem } from '../../models/FoodItem';
import { AuthenticationService } from  '../../shared/services/authentication.service';

@Component({
    selector: 'home-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FoodDataService],
    templateUrl: 'app/components/home/home.component.html'
})


export class HomeComponent {

    randomFood: FoodItem;
    errorMessage: string;
    
    constructor(private _foodDataService: FoodDataService, public authenticationService: AuthenticationService) {

    }

    public ngOnInit() {
        this.getRandomFood();
    }

    public getRandomFood() {
        this.randomFood = null;
        this._foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {
                this.randomFood = response;
            }, error => {
                if (error.status == 404) {
                    this.errorMessage = "No food found :-(";
                } else {
                    this.errorMessage = "There was an error";
                }
            });
    }

    getRecipesWithGoogle(): void {
        window.open('https://www.google.de/search?q=' + this.randomFood.ItemName, '_blank');
    }

    getRecipesWithBing(): void {
        window.open('https://www.bing.com/search?q=' + this.randomFood.ItemName, '_blank');
    }
}