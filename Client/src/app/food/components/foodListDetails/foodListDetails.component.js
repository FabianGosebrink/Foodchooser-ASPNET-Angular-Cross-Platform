var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { FoodDataService } from './../../../core/services/food-data.service';
import { CONFIGURATION } from './../../../shared/app.constants';
import { CameraFactory } from './../../../core/factories/cameraFactory';
import { FoodItem } from './../../../shared/models/foodItem';
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
var FoodListDetails = (function () {
    function FoodListDetails(_router, _activatedRoute, _foodDataService, _foodListDataService, _cameraFactory, _ngZone) {
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this._foodDataService = _foodDataService;
        this._foodListDataService = _foodListDataService;
        this._cameraFactory = _cameraFactory;
        this._ngZone = _ngZone;
        this.currentFood = new FoodItem();
        this._cameraService = _cameraFactory.getCameraService();
    }
    FoodListDetails.prototype.ngOnInit = function () {
        var _this = this;
        this._activatedRoute.params.subscribe(function (params) {
            _this._listId = +params['foodId'];
            _this.getSingleList(_this._listId);
            _this.getAllFoodFromList(_this._listId);
        });
    };
    FoodListDetails.prototype.getSingleList = function (listId) {
        var _this = this;
        this._foodListDataService
            .GetSingleList(listId)
            .subscribe(function (response) {
            _this.currentFoodList = response;
            console.log(_this.currentFoodList);
        }, function (error) { return console.log(error); });
    };
    FoodListDetails.prototype.getAllFoodFromList = function (listId) {
        var _this = this;
        this._foodListDataService
            .GetFoodFromList(listId)
            .subscribe(function (response) {
            _this.currentFoods = response;
            _this.currentFoodsBackUp = response;
            _this.currentFoods.forEach(function (element) {
                element.ImageString = CONFIGURATION.baseUrls.server + element.ImageString;
                console.log('----->' + element.ImageString);
            });
        }, function (error) { return console.log(error); });
    };
    FoodListDetails.prototype.togglePublic = function (food) {
        var _this = this;
        food.IsPublic = !food.IsPublic;
        this._foodDataService
            .UpdateFood(food.Id, food)
            .subscribe(function (response) {
            _this.getAllFoodFromList(_this._listId);
        }, function (response) {
            console.log(response);
        });
    };
    FoodListDetails.prototype.showRandomFoodFromList = function () {
        this.currentFoods = this.currentFoodsBackUp;
        if (this.currentFoods.length > 1) {
            var foodToShow = [];
            var index = Math.floor((Math.random() * this.currentFoods.length));
            foodToShow.push(this.currentFoods[index]);
            this.currentFoods = foodToShow;
        }
    };
    FoodListDetails.prototype.setToUpdate = function (foodItem) {
        this.currentFood = foodItem;
    };
    FoodListDetails.prototype.addOrUpdateFood = function () {
        if (this.currentFood.Id) {
            this.updateFood(this.currentFood);
        }
        else {
            this.addFood(this.currentFood);
        }
    };
    FoodListDetails.prototype.updateFood = function (foodItem) {
        var _this = this;
        this._foodDataService
            .UpdateFood(foodItem.Id, foodItem)
            .subscribe(function (response) {
            _this.getAllFoodFromList(_this._listId);
            _this.currentFood = new FoodItem();
        }, function (error) { return console.log(error); });
    };
    FoodListDetails.prototype.addFood = function (foodItem) {
        var _this = this;
        if (foodItem.ItemName) {
            foodItem.FoodListId = this.currentFoodList.Id;
            this._foodDataService
                .AddFood(foodItem)
                .subscribe(function (response) {
                _this.getAllFoodFromList(_this._listId);
                _this.currentFood = new FoodItem();
            }, function (error) { return console.log(error); });
        }
    };
    FoodListDetails.prototype.deleteList = function () {
        var _this = this;
        if (this.currentFoodList) {
            this._foodListDataService
                .DeleteList(this.currentFoodList.Id)
                .subscribe(function (response) {
                var link = ['/foodlists'];
                _this._router.navigate(link);
            }, function (error) { return console.log(error); });
        }
    };
    FoodListDetails.prototype.deleteFood = function (foodId) {
        var _this = this;
        this._foodDataService
            .DeleteFood(foodId)
            .subscribe(function (response) {
            _this.getAllFoodFromList(_this._listId);
        }, function (error) { return console.log(error); });
    };
    FoodListDetails.prototype.takePhoto = function (foodItem) {
        var _this = this;
        this._cameraService
            .getPhoto()
            .subscribe(function (url) {
            _this._ngZone.run(function () {
                foodItem.ImageString = url;
                _this.updateFood(foodItem);
            });
        });
    };
    return FoodListDetails;
}());
FoodListDetails = __decorate([
    Component({
        selector: 'foodListDetails-component',
        templateUrl: './foodListDetails.component.html'
    }),
    __metadata("design:paramtypes", [Router,
        ActivatedRoute,
        FoodDataService,
        FoodListDataService,
        CameraFactory,
        NgZone])
], FoodListDetails);
export { FoodListDetails };
//# sourceMappingURL=foodListDetails.component.js.map