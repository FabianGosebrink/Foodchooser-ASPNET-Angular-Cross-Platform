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
import { FoodList } from './../../../shared/models/foodList';
import { Component } from '@angular/core';
export var FoodListFormComponent = (function () {
    function FoodListFormComponent(foodListDataService) {
        this.foodListDataService = foodListDataService;
        this.list = new FoodList();
    }
    FoodListFormComponent.prototype.addList = function () {
        var _this = this;
        if (this.list.Name) {
            this.foodListDataService
                .AddList(this.list.Name)
                .subscribe(function (response) {
                _this.list = new FoodList();
            }, function (error) {
                console.log(error);
                _this.errorMessage = error.Message;
            });
        }
    };
    FoodListFormComponent = __decorate([
        Component({
            selector: 'foodListForm-component',
            templateUrl: './foodListForm.component.html'
        }), 
        __metadata('design:paramtypes', [FoodListDataService])
    ], FoodListFormComponent);
    return FoodListFormComponent;
}());
//# sourceMappingURL=foodListForm.component.js.map