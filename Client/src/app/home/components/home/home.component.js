var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CONFIGURATION } from './../../../shared/app.constants';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { FoodDataService } from './../../../core/services/food-data.service';
import { Component } from '@angular/core';
var HomeComponent = (function () {
    function HomeComponent(foodDataService, authenticationService) {
        this.foodDataService = foodDataService;
        this.authenticationService = authenticationService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getRandomFood();
    };
    HomeComponent.prototype.getRandomFood = function () {
        var _this = this;
        this.randomFood = null;
        this.foodDataService
            .GetRandomFood()
            .subscribe(function (response) {
            _this.randomFood = response;
            _this.randomFood.ImageString = CONFIGURATION.baseUrls.server + _this.randomFood.ImageString;
        }, function (error) {
            if (error.status == 404) {
                _this.errorMessage = 'No food found :-(';
            }
            else {
                _this.errorMessage = 'There was an error';
            }
        });
    };
    HomeComponent.prototype.getRecipesWithGoogle = function () {
        window.open('https://www.google.de/search?q=' + this.randomFood.ItemName, '_blank');
    };
    HomeComponent.prototype.getRecipesWithBing = function () {
        window.open('https://www.bing.com/search?q=' + this.randomFood.ItemName, '_blank');
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'home-component',
        templateUrl: './home.component.html'
    }),
    __metadata("design:paramtypes", [FoodDataService,
        AuthenticationService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map