import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { ComponentRef, provide, enableProdMode, bind } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { HttpWrapperService } from './shared/services/httpWrapper.service';
import { StorageService } from './shared/services/storage.service';
import { CurrentUserService } from './shared/services/currentUser.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { appInjector } from './shared/services/appInjector';
import { PlatformInformationService } from './shared/services/platformInformationService';
import { CameraService } from './shared/services/cameraService';
import { MobileCameraService } from './shared/services/mobileCameraService';
import { DesktopCameraService } from './shared/services/desktopCameraService';
import { HeaderComponent } from  './components/header/header.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

let evaluateCameraService = () => {
    return (platformInformationService: PlatformInformationService): CameraService => {
        return platformInformationService.isMobile ? new MobileCameraService() : new DesktopCameraService();
    };
};

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: CameraService, useFactory: evaluateCameraService(), deps: [PlatformInformationService] },
    HTTP_PROVIDERS,
    HttpWrapperService,
    CurrentUserService,
    StorageService,
    HeaderComponent,
    AuthenticationService
]).then((appRef: ComponentRef<AppComponent>) => {
    appInjector(appRef.injector);
});



