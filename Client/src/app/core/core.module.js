var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { FoodListDataService } from './services/foodList-data.service';
import { FoodDataService } from './services/food-data.service';
import { CameraFactory } from './factories/cameraFactory';
import { PlatformInformationService } from './services/platformInformation.service';
import { StorageService } from './services/storage.service';
import { CurrentUserService } from './services/currentUser.service';
import { HttpWrapperService } from './services/httpWrapper.service';
import { AuthenticationService } from './services/authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [],
        declarations: [],
        providers: [
            AuthenticationService,
            HttpWrapperService,
            CurrentUserService,
            StorageService,
            PlatformInformationService,
            CameraFactory,
            FoodDataService,
            FoodListDataService
        ],
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map