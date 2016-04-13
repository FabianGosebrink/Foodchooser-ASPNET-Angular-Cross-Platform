import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList } from '../../models/foodList';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

@Component({
    selector: 'foodListForm-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: 'app/components/foodListForm/foodListForm.component.html'
})

@NeedsAuthentication()
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