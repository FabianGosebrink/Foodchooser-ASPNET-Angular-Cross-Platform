import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES, RouteParams, Router } from 'angular2/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodItem } from '../../models/FoodItem';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList } from '../../models/FoodList';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

@Component({
    selector: 'foodListDetails-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FoodDataService, FoodListDataService],
    templateUrl: 'app/components/foodListDetails/foodListDetails.component.html'
})

@NeedsAuthentication()
export class FoodListDetails implements OnInit {

    currentFoodList: FoodList;
    currentFoods: FoodItem[];
    currentFoodsBackUp: FoodItem[];
    currentFood: FoodItem;

    constructor(private _routeparams: RouteParams,
        private _foodDataService: FoodDataService,
        private _foodListDataService: FoodListDataService,
        private _router: Router) {

        this.currentFood = new FoodItem();
    }

    ngOnInit() {
        this.getSingleList();
        this.getAllFoodFromList();
    }

    private getSingleList() {
        let listId = this._routeparams.get('id');
        this._foodListDataService
            .GetSingleList(parseInt(listId))
            .subscribe((response: FoodList) => {
                this.currentFoodList = response;
                console.log(this.currentFoodList)
            }, error => console.log(error));
    }

    private getAllFoodFromList() {
        let listId = this._routeparams.get('id');
        this._foodListDataService
            .GetFoodFromList(parseInt(listId))
            .subscribe((response: FoodItem[]) => {
                this.currentFoods = response;
                this.currentFoodsBackUp = response;
            }, error => console.log(error));
    }

    public togglePublic(food: FoodItem) {
        food.IsPublic = !food.IsPublic;
        this._foodDataService
            .UpdateFood(food.Id, food)
            .subscribe((response: FoodItem) => {
                this.getAllFoodFromList();
            }, (response) => {
                console.log(response);
            });
    }

    public showRandomFoodFromList() {
        this.currentFoods = this.currentFoodsBackUp;

        if (this.currentFoods.length > 1) {
            var foodToShow = [];
            var index = Math.floor((Math.random() * this.currentFoods.length));
            foodToShow.push(this.currentFoods[index]);
            this.currentFoods = foodToShow;
        }
    }

    public setToUpdate(foodItem: FoodItem) {
        this.currentFood = foodItem;
    }

    public addOrUpdateFood() {
        if (this.currentFood.Id) {
            this.updateFood(this.currentFood);
        } else {
            this.addFood(this.currentFood);
        }
    }

    private updateFood(foodItem: FoodItem) {
        this._foodDataService
            .UpdateFood(foodItem.Id, foodItem)
            .subscribe((response: FoodItem) => {
                this.getAllFoodFromList();
                this.currentFood = new FoodItem();
            }, error => console.log(error));
    }

    private addFood(foodItem: FoodItem) {
        if (foodItem.ItemName) {
            foodItem.FoodListId = this.currentFoodList.Id;

            this._foodDataService
                .AddFood(foodItem)
                .subscribe((response: FoodItem) => {
                    this.getAllFoodFromList();
                    this.currentFood = new FoodItem();
                }, error => console.log(error));
        }
    }

    public deleteList() {
        if (this.currentFoodList) {
            this._foodListDataService
                .DeleteList(this.currentFoodList.Id)
                .subscribe((response: any) => {
                    this._router.navigate(['FoodLists']);
                }, error => console.log(error));
        }
    }

    public deleteFood(foodId: number) {

        this._foodDataService
            .DeleteFood(foodId)
            .subscribe((response: any) => {
                this.getAllFoodFromList();
            }, error => console.log(error));

    }
}