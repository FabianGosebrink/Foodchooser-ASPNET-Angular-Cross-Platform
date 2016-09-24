import { Component } from '@angular/core';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList } from '../../models/FoodList';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

@Component({
    selector: 'foodListForm-component',
    template: require('./foodListForm.component.html')
})

export class FoodListFormComponent {

    list: FoodList;
    errorMessage: string;

    constructor(private _foodListDataService: FoodListDataService) {
        this.list = new FoodList();
    }

    public addList() {
        if (this.list.Name) {
            this._foodListDataService
                .AddList(this.list.Name)
                .subscribe((response: FoodList) => {
                    console.log("added list");
                    this.list = new FoodList();
                },
                error => {console.log(error)
                    this.errorMessage= error.Message;}
                    );
        }
    }
}