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
import { FoodListWithImage } from './../../../shared/models/foodList';
import { Component } from '@angular/core';
var FoodListComponent = (function () {
    function FoodListComponent(foodListDataService) {
        var _this = this;
        this.foodListDataService = foodListDataService;
        foodListDataService.foodListAdded.subscribe(function (foodList) {
            _this.getAllLists();
        });
        this.allLists = [];
    }
    FoodListComponent.prototype.ngOnInit = function () {
        this.getAllLists();
    };
    FoodListComponent.prototype.getAllLists = function () {
        var _this = this;
        this.allLists = [];
        this.allFoodLists = [];
        this.foodListDataService
            .GetAllLists()
            .subscribe(function (response) {
            _this.allFoodLists = response;
        }, function (error) {
            _this.errorMessage = error;
        }, function () {
            console.log(_this.allFoodLists);
            _this.allFoodLists.forEach(function (element) {
                console.log(element);
                _this.foodListDataService
                    .GetRandomImageStringFromList(element.Id)
                    .subscribe(function (result) {
                    console.log(result);
                    var foodListWithImage = new FoodListWithImage(element, result);
                    _this.allLists.push(foodListWithImage);
                });
            });
        });
    };
    return FoodListComponent;
}());
FoodListComponent = __decorate([
    Component({
        selector: 'foodlists-component',
        templateUrl: './foodlists.component.html'
    }),
    __metadata("design:paramtypes", [FoodListDataService])
], FoodListComponent);
export { FoodListComponent };
//# sourceMappingURL=foodlists.component.js.map