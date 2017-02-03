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

@NgModule({
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

export class CoreModule { }
