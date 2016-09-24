import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FoodListComponent } from  '../foodlists/foodLists.component';
import { FoodComponent } from  '../food/food.component';
import { FoodListDetails } from  '../foodListDetails/foodListDetails.component';
import { FoodListFormComponent } from  '../FoodListForm/FoodListForm.component';
import { foodRouting } from  './food.routes';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        foodRouting
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