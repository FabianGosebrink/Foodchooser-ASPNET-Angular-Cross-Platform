import { Component, Input, OnInit } from '@angular/core';

import { FoodList } from './../../../shared/models/foodList';

@Component({
    selector: 'foodlists-component',
    templateUrl: './foodlists.component.html'
})

export class FoodListComponent implements OnInit {

    @Input() allLists: FoodList[] = [];
    // errorMessage: string;

    // constructor() { }

    public ngOnInit() {
        // this.getAllLists();
    }

    // private getAllLists() {
    //     this.allLists = [];
    //     this.allFoodLists = [];
    //     this.foodListDataService
    //         .getAllLists()
    //         .map((response: any) => response.value)
    //         .map((items: FoodList[]) => {
    //             this.allFoodLists = items;
    //             return items;
    //         }).map(() => {
    //             this.allFoodLists.forEach(element => {
    //                 this.foodListDataService
    //                     .getRandomImageStringFromList(element.Id)
    //                     .subscribe((result: string) => {
    //                         this.allLists.push(new FoodListWithImage(element, result));
    //                     });
    //             });
    //         });
    // }
}
