import { CommonModule } from '@angular/common';
import { FoodListFormComponent } from './components/foodListForm/foodListForm.component';
import { FoodListDetails } from './components/foodListDetails/foodListDetails.component';
import { FoodComponent } from './components/food/food.component';
import { FoodListComponent } from './components/foodlists/foodlists.component';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FoodRoutes } from './food.routes';

@NgModule({
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

    providers: [
    ]
})

export class FoodModule { }
