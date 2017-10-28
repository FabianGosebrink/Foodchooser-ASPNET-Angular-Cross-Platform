import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CameraFactory } from './../../../core/factories/cameraFactory';
import { ICameraService } from './../../../core/services/camera.service';
import { FoodDataService } from './../../../core/services/food-data.service';
import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { FoodItem } from './../../../shared/models/foodItem';
import { FoodList } from './../../../shared/models/foodList';

@Component({
    selector: 'foodListDetails-component',
    templateUrl: './foodListDetails.component.html'
})

export class FoodListDetails implements OnInit {

    currentFoodList: FoodList;
    currentFood: FoodItem = new FoodItem();
    private _listId: string;
    private _cameraService: ICameraService;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _foodDataService: FoodDataService,
        private _foodListDataService: FoodListDataService,
        private _cameraFactory: CameraFactory,
        private _ngZone: NgZone) {

        this._cameraService = _cameraFactory.getCameraService();
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            this._listId = params['foodId'];
            this.getSingleList(this._listId);
        });
    }

    private getSingleList(listId: string) {
        this._foodListDataService
            .getSingleList(listId)
            .map((response: FoodList) => {
                this.currentFoodList = response;
            })
            .switchMap(() => {
                return this._foodListDataService.getFoodFromList(listId)
            })
            .subscribe((foodItems: FoodItem[]) => {
                this.currentFoodList.foods = foodItems;
            });
    }

    togglePublic(food: FoodItem) {
        food.isPublic = !food.isPublic;
        this._foodDataService
            .updateFood(food.id, food)
            .subscribe((response: FoodItem) => {
                // this.getAllFoodFromList(this._listId);
            });
    }

    showRandomFoodFromList() {
        // this.currentFoods = this.currentFoodsBackUp;

        // if (this.currentFoods.length > 1) {
        //     let foodToShow: FoodItem[] = [];
        //     let index = Math.floor((Math.random() * this.currentFoods.length));
        //     foodToShow.push(this.currentFoods[index]);
        //     this.currentFoods = foodToShow;
        // }
    }

    setToUpdate(foodItem: FoodItem) {
        this.currentFood = foodItem;
    }

    addOrUpdateFood() {
        if (this.currentFood.id) {
            this.updateFood(this.currentFood);
        } else {
            this.addFood(this.currentFood);
        }
    }

    private updateFood(foodItem: FoodItem) {
        this._foodDataService
            .updateFood(foodItem.id, foodItem)
            .subscribe((response: FoodItem) => {
                this.currentFood = new FoodItem();
            }, error => console.log(error));
    }

    private addFood(foodItem: FoodItem) {
        if (foodItem.itemName) {
            foodItem.foodListId = this.currentFoodList.id;

            this._foodDataService
                .addFood(foodItem)
                .map((response: FoodItem) => {
                    this.currentFood = new FoodItem();
                })
                .switchMap(() => {
                    return this._foodListDataService.getFoodFromList(foodItem.foodListId)
                })
                .subscribe((foodItems: FoodItem[]) => {
                    this.currentFoodList.foods = foodItems;
                });
        }
    }

    deleteList() {
        if (this.currentFoodList) {
            this._foodListDataService
                .deleteList(this.currentFoodList.id)
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

            }, error => console.log(error));

    }

    takePhoto(foodItem: FoodItem) {
        this._cameraService
            .getPhoto()
            .map((url: string) => {
                foodItem.imageString = url;
                return foodItem;
            })
            .map((item: FoodItem) => {
                return this._foodDataService.updateFood(item.id, item)
            })
            .switchMap(() => {
                return this._foodListDataService.getFoodFromList(foodItem.foodListId)
            })
            .subscribe((foodItems: FoodItem[]) => {
                this.currentFoodList.foods = foodItems;
            });
    }
}
