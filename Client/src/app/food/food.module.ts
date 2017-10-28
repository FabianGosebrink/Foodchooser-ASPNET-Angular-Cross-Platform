import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FoodComponent } from './components/food/food.component';
import { FoodListDetails } from './components/foodListDetails/foodListDetails.component';
import { FoodListFormComponent } from './components/foodListForm/foodListForm.component';
import { FoodListComponent } from './components/foodlists/foodlists.component';
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
    ]
})

export class FoodModule { }
