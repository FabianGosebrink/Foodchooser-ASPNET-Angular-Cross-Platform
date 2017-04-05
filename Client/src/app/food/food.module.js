var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var FoodModule = (function () {
    function FoodModule() {
    }
    return FoodModule;
}());
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
    })
], FoodModule);
export { FoodModule };
//# sourceMappingURL=food.module.js.map