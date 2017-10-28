import { Component, EventEmitter, Output } from '@angular/core';

import { FoodListDataService } from './../../../core/services/foodList-data.service';
import { FoodList } from './../../../shared/models/foodList';

@Component({
    selector: 'foodListForm-component',
    templateUrl: './foodListForm.component.html'
})

export class FoodListFormComponent {

    @Output() onFoodListAdded = new EventEmitter();
    list: FoodList = new FoodList();

    constructor() {  }

    addList() {
        this.onFoodListAdded.emit(this.list.name);
    }
}
