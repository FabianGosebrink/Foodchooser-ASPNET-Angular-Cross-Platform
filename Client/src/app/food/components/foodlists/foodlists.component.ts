import { Component, OnInit } from '@angular/core';

import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { FoodList, FoodListWithImage } from './../../../shared/models/foodList';

@Component({
    selector: 'foodlists-component',
    templateUrl: './foodlists.component.html'
})

export class FoodListComponent implements OnInit {

    allLists: FoodListWithImage[] = [];
    allFoodLists: FoodList[] = [];
    errorMessage: string;

    constructor(private foodListDataService: FoodListDataService) {
        foodListDataService.foodListAdded.subscribe((foodList: FoodList) => {
            this.getAllLists();
        });

        this.allLists = [];
    }

    public ngOnInit() {
        this.getAllLists();
    }

    private getAllLists() {
        this.allLists = [];
        this.allFoodLists = [];
        this.foodListDataService
            .getAllLists()
            .map((response: any) => response.value)
            .map((items: FoodList[]) => {
                this.allFoodLists = items;
                return items;
            }).map(() => {
                this.allFoodLists.forEach(element => {
                    this.foodListDataService
                        .getRandomImageStringFromList(element.Id)
                        .subscribe((result: string) => {
                            this.allLists.push(new FoodListWithImage(element, result));
                        });
                });
            });
    }
}
