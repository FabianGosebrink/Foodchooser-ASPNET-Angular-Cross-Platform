import { Component, Input, OnInit } from '@angular/core';

import { FoodList } from './../../../shared/models/foodList';

@Component({
    selector: 'foodlists-component',
    templateUrl: './foodlists.component.html'
})

export class FoodListComponent {
    @Input() allLists: FoodList[] = [];
}
