var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommonModule } from '@angular/common';
import { FoodListFormComponent } from './components/foodListForm/foodListForm.component';
import { FoodListDetails } from './components/foodListDetails/foodListDetails.component';
import { FoodComponent } from './components/food/food.component';
import { FoodListComponent } from './components/foodlists/foodlists.component';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FoodRoutes } from './food.routes';
export var FoodModule = (function () {
    function FoodModule() {
    }
    FoodModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpModule,
                FormsModule,
                FoodRoutes
            ],
            declarations: [
                FoodListComponent,
                FoodComponent,
                FoodListDetails,
                FoodListFormComponent
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], FoodModule);
    return FoodModule;
}());
//# sourceMappingURL=food.module.js.map