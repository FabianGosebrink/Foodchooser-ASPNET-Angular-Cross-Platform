import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FoodDataService } from '../../shared/services/food.dataService';
import { FoodItem } from '../../models/FoodItem';
import { AuthenticationService } from  '../../shared/services/authentication.service';
import { DesktopCameraService } from  '../../shared/services/desktopCameraService';
import { MobileCameraService } from  '../../shared/services/mobileCameraService';
import { ICameraService } from  '../../shared/services/cameraService';
import { CameraFactory } from  '../../shared/cameraFactory';

@Component({
    selector: 'home-component',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FoodDataService, CameraFactory],
    template: require('./home.component.html')
})


export class HomeComponent implements OnInit {

    public randomFood: FoodItem;
    public errorMessage: string;
    public pictureUrl: string;

    private _cameraService: ICameraService;

    constructor(
        private _foodDataService: FoodDataService,
        public authenticationService: AuthenticationService,
        private _cameraFactory: CameraFactory) {
            
        this._cameraService = _cameraFactory.getCameraService();
    }

    public ngOnInit() {
        this.getRandomFood();
    }

    public takePhoto() {
        this._cameraService
            .getPhoto()
            .subscribe((url: string) => {
                alert(url);
                this.pictureUrl = url;
                console.log("picture: " + this.pictureUrl.substr(0, 50) + "...");
            });
    }

    public getRandomFood() {
        this.randomFood = null;
        this._foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {
                this.randomFood = response;
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