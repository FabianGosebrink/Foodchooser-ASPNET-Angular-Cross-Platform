import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { CONFIGURATION } from '../../shared/app.constants';
import { FoodItem } from '../../models/FoodItem';
import { AuthenticationService } from  '../../shared/services/authentication.service';
import { DesktopCameraService } from  '../../shared/services/desktopCameraService';
import { MobileCameraService } from  '../../shared/services/mobileCameraService';
import { CameraFactory } from  '../../shared/cameraFactory';

@Component({
    selector: 'home-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FoodDataService],
    template: require('./home.component.html')
})


export class HomeComponent implements OnInit {

    public randomFood: FoodItem;
    public errorMessage: string;

    constructor(
        private _foodDataService: FoodDataService,
        public authenticationService: AuthenticationService) { }

    public ngOnInit() {
        this.getRandomFood();
    }

    public getRandomFood() {
        this.randomFood = null;
        this._foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {
                this.randomFood = response;
                this.randomFood.ImageString = CONFIGURATION.baseUrls.server + this.randomFood.ImageString;
            }, error => {
                if (error.status == 404) {
                    this.errorMessage = "No food found :-(";
                } else {
                    this.errorMessage = "There was an error";
                }
            });
    }

    getRecipesWithGoogle(): void {
        window.open('https://www.google.de/search?q=' + this.randomFood.ItemName, '_blank');
    }

    getRecipesWithBing(): void {
        window.open('https://www.bing.com/search?q=' + this.randomFood.ItemName, '_blank');
    }
}