import { Component, OnInit } from '@angular/core';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList, FoodListWithImage } from '../../models/FoodList';
import { FoodItem } from '../../models/FoodItem';

@Component({
    selector: 'foodlists-component',
    template: require('./foodlists.component.html')
})

export class FoodListComponent implements OnInit {

    allLists: FoodListWithImage[];
    allFoodLists: FoodList[];
    errorMessage: string;

    constructor(private _foodListDataService: FoodListDataService) {
        _foodListDataService.foodListAdded.subscribe((foodList: FoodList) => {
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
        this._foodListDataService
            .GetAllLists()
            .subscribe((response: FoodList[]) => {
                this.allFoodLists = response;
            }, error => {
                this.errorMessage = error;
            }, () => {
                console.log(this.allFoodLists);
                this.allFoodLists.forEach(element => {
                    console.log(element);
                    this._foodListDataService
                        .GetRandomImageStringFromList(element.Id)
                        .subscribe((result: string) => {
                             console.log(result);
                            let foodListWithImage = new FoodListWithImage(element, result);
                            this.allLists.push(foodListWithImage);
                        });
                });

            });
    }
}