import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { FoodListWithImage, FoodList } from './../../../shared/models/foodList';
import { Component, OnInit } from '@angular/core';

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
            .GetAllLists()
            .subscribe((response: FoodList[]) => {
                this.allFoodLists = response.value;
            }, error => {
                this.errorMessage = error;
            }, () => {
                console.log(this.allFoodLists);
                this.allFoodLists.forEach(element => {
                    console.log(element);
                    this.foodListDataService
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
