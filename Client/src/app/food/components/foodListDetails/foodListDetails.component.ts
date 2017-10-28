import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CameraFactory } from './../../../core/factories/cameraFactory';
import { ICameraService } from './../../../core/services/camera.service';
import { FoodDataService } from './../../../core/services/food-data.service';
import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { CONFIGURATION } from './../../../shared/app.constants';
import { FoodItem } from './../../../shared/models/foodItem';
import { FoodList } from './../../../shared/models/foodList';

@Component({
    selector: 'foodListDetails-component',
    templateUrl: './foodListDetails.component.html'
})

export class FoodListDetails implements OnInit {

    currentFoodList: FoodList;
    currentFoods: FoodItem[];
    currentFoodsBackUp: FoodItem[];
    currentFood: FoodItem;
    private _listId: string;
    private _cameraService: ICameraService;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _foodDataService: FoodDataService,
        private _foodListDataService: FoodListDataService,
        private _cameraFactory: CameraFactory,
        private _ngZone: NgZone) {

        this.currentFood = new FoodItem();
        this._cameraService = _cameraFactory.getCameraService();
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            this._listId = params['foodId'];
            this.getSingleList(this._listId);
            this.getAllFoodFromList(this._listId);
        });

    }

    private getSingleList(listId: string) {

        this._foodListDataService
            .getSingleList(listId)
            .subscribe((response: FoodList) => {
                this.currentFoodList = response;
                console.log(this.currentFoodList)
            }, (error: any) => console.log(error));
    }

    private getAllFoodFromList(listId: string) {

        this._foodListDataService
            .getFoodFromList(listId)
            .subscribe((response: FoodItem[]) => {
                this.currentFoods = response;
                this.currentFoodsBackUp = response;

                this.currentFoods.forEach((element: FoodItem) => {
                    element.ImageString = CONFIGURATION.baseUrls.server + element.ImageString;
                    console.log('----->' + element.ImageString);
                });

            }, (error: any) => console.log(error));
    }

    togglePublic(food: FoodItem) {
        food.IsPublic = !food.IsPublic;
        this._foodDataService
            .updateFood(food.Id, food)
            .subscribe((response: FoodItem) => {
                this.getAllFoodFromList(this._listId);
            }, (response) => {
                console.log(response);
            });
    }

    showRandomFoodFromList() {
        this.currentFoods = this.currentFoodsBackUp;

        if (this.currentFoods.length > 1) {
            let foodToShow: FoodItem[] = [];
            let index = Math.floor((Math.random() * this.currentFoods.length));
            foodToShow.push(this.currentFoods[index]);
            this.currentFoods = foodToShow;
        }
    }

    setToUpdate(foodItem: FoodItem) {
        this.currentFood = foodItem;
    }

    addOrUpdateFood() {
        if (this.currentFood.Id) {
            this.updateFood(this.currentFood);
        } else {
            this.addFood(this.currentFood);
        }
    }

    private updateFood(foodItem: FoodItem) {
        this._foodDataService
            .updateFood(foodItem.Id, foodItem)
            .subscribe((response: FoodItem) => {
                this.getAllFoodFromList(this._listId);
                this.currentFood = new FoodItem();
            }, error => console.log(error));
    }

    private addFood(foodItem: FoodItem) {
        if (foodItem.ItemName) {
            foodItem.FoodListId = this.currentFoodList.Id;

            this._foodDataService
                .addFood(foodItem)
                .subscribe((response: FoodItem) => {
                    this.getAllFoodFromList(this._listId);
                    this.currentFood = new FoodItem();
                }, error => console.log(error));
        }
    }

    deleteList() {
        if (this.currentFoodList) {
            this._foodListDataService
                .deleteList(this.currentFoodList.Id)
                .subscribe((response: any) => {
                    let link = ['/foodlists'];
                    this._router.navigate(link);
                }, error => console.log(error));
        }
    }

    deleteFood(foodId: number) {

        this._foodDataService
            .deleteFood(foodId)
            .subscribe((response: any) => {
                this.getAllFoodFromList(this._listId);
            }, error => console.log(error));

    }

    takePhoto(foodItem: FoodItem) {
        this._cameraService
            .getPhoto()
            .subscribe((url: string) => {
                this._ngZone.run(() => {
                    foodItem.ImageString = url;
                    this.updateFood(foodItem);
                });
            });
    }
}
