var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CONFIGURATION } from './../../shared/app.constants';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpWrapperService } from './httpWrapper.service';
export var FoodListDataService = (function () {
    function FoodListDataService(_http) {
        var _this = this;
        this._http = _http;
        this.foodListAdded = new EventEmitter();
        this.GetAllLists = function () {
            return _this._http.get(_this.actionUrl)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetSingleList = function (id) {
            return _this._http.get(_this.actionUrl + id)
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.GetFoodFromList = function (id) {
            return _this._http.get(_this.actionUrl + id + '/foods')
                .map(function (response) { return response.json(); })
                .do(_this.setDate)
                .catch(_this.handleError);
        };
        this.AddList = function (foodListName) {
            var toAdd = JSON.stringify({ Name: foodListName });
            return _this._http.post(_this.actionUrl, toAdd)
                .map(function (response) { return response.json(); })
                .do(function (addedList) { return _this.foodListAdded.emit(addedList); })
                .catch(_this.handleError);
        };
        this.UpdateList = function (id, listToUpdate) {
            return _this._http.put(_this.actionUrl + id, JSON.stringify(listToUpdate))
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.DeleteList = function (id) {
            return _this._http.delete(_this.actionUrl + id)
                .catch(_this.handleError);
        };
        this.GetRandomImageStringFromList = function (id) {
            return _this._http.get(_this.actionUrl + id + "/getrandomimage")
                .map(function (response) { return response.json(); })
                .catch(_this.handleError);
        };
        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foodlists/';
    }
    FoodListDataService.prototype.setDate = function (foodItems) {
        for (var index = 0; index < foodItems.length; index++) {
            var element = foodItems[index];
            element.Created = new Date(String(element.Created));
        }
    };
    FoodListDataService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], FoodListDataService.prototype, "foodListAdded", void 0);
    FoodListDataService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [HttpWrapperService])
    ], FoodListDataService);
    return FoodListDataService;
}());
//# sourceMappingURL=foodList-data.service.js.map