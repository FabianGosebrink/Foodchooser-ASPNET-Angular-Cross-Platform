import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';

import { CameraFactory } from './factories/cameraFactory';
import { AuthenticationService } from './services/authentication.service';
import { CurrentUserService } from './services/currentUser.service';
import { FoodDataService } from './services/food-data.service';
import { FoodListDataService } from './services/foodList-data.service';
import { HttpWrapperService, MyFirstInterceptor } from './services/httpWrapper.service';
import { PlatformInformationService } from './services/platformInformation.service';
import { StorageService } from './services/storage.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        // see below
    ],
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                AuthenticationService,
                HttpWrapperService,
                CurrentUserService,
                StorageService,
                PlatformInformationService,
                CameraFactory,
                FoodDataService,
                FoodListDataService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MyFirstInterceptor,
                    multi: true,
                }]
        };
    }
}
