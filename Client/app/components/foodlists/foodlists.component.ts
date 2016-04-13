import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodListDataService } from '../../shared/services/foodList.dataService';
import { FoodList } from '../../models/foodList';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';

@Component({
    selector: 'foodlists-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    templateUrl: 'app/components/foodlists/foodlists.component.html'
})

@NeedsAuthentication()
export class FoodListComponent implements OnInit {

    allLists: FoodList[];

    constructor(private _foodListDataService: FoodListDataService) {
        _foodListDataService.foodListAdded.subscribe((foodList: FoodList) => {
            this.getAllLists();
        });
    }

    public ngOnInit() {
        this.getAllLists();
    }

    private getAllLists() {
        this._foodListDataService
            .GetAllLists()
            .subscribe((response: FoodList[]) => {
                this.allLists = response;
                console.log(response.length);
            }, error => {
                this.errorMessage = error;
            });
    }
}