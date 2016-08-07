import { Component, OnInit, NgZone } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodItem } from '../../models/FoodItem';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList } from '../../models/FoodList';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';
import { ICameraService } from  '../../shared/services/cameraService';
import { CameraFactory } from  '../../shared/cameraFactory';

@Component({
    selector: 'foodListDetails-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FoodDataService, FoodListDataService, CameraFactory],
    template: require('./foodListDetails.component.html')
})

export class FoodListDetails implements OnInit {

    currentFoodList: FoodList;
    currentFoods: FoodItem[];
    currentFoodsBackUp: FoodItem[];
    currentFood: FoodItem;
    private _listId: number;
    private _cameraService: ICameraService;

    constructor(private _activatedRoute: ActivatedRoute,
        private _foodDataService: FoodDataService,
        private _foodListDataService: FoodListDataService,
        private _router: Router,
        private _cameraFactory: CameraFactory,
        private _ngZone: NgZone) {

        this.currentFood = new FoodItem();
        this._cameraService = _cameraFactory.getCameraService();
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            this._listId = +params['id'];
            this.getSingleList(this._listId);
            this.getAllFoodFromList(this._listId);
        });

    }

    private getSingleList(listId: number) {

        this._foodListDataService
            .GetSingleList(listId)
            .subscribe((response: FoodList) => {
                this.currentFoodList = response;
                console.log(this.currentFoodList)
            }, error => console.log(error));
    }

    private getAllFoodFromList(listId: number) {

        this._foodListDataService
            .GetFoodFromList(listId)
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
                this.getAllFoodFromList(this._listId);
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
                this.getAllFoodFromList(this._listId);
                this.currentFood = new FoodItem();
            }, error => console.log(error));
    }

    private addFood(foodItem: FoodItem) {
        if (foodItem.ItemName) {
            foodItem.FoodListId = this.currentFoodList.Id;

            this._foodDataService
                .AddFood(foodItem)
                .subscribe((response: FoodItem) => {
                    this.getAllFoodFromList(this._listId);
                    this.currentFood = new FoodItem();
                }, error => console.log(error));
        }
    }

    public deleteList() {
        if (this.currentFoodList) {
            this._foodListDataService
                .DeleteList(this.currentFoodList.Id)
                .subscribe((response: any) => {
                    this._router.navigate(['/foodLists']);
                }, error => console.log(error));
        }
    }

    public deleteFood(foodId: number) {

        this._foodDataService
            .DeleteFood(foodId)
            .subscribe((response: any) => {
                this.getAllFoodFromList(this._listId);
            }, error => console.log(error));

    }

    public takePhoto(foodItem: FoodItem) {
        this._cameraService
            .getPhoto()
            .subscribe((url: string) => {
                this._ngZone.run(() => {
                    foodItem.Base64ImageString = url;
                    this.updateFood(foodItem);
                });
            });
    }
}