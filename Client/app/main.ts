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
import { HeaderComponent } from  './components/header/header.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue: '/'},
    HTTP_PROVIDERS,
    HttpWrapperService,
    CurrentUserService,
    StorageService,
    HeaderComponent,
    AuthenticationService
]).then((appRef: ComponentRef<AppComponent>) => {
    appInjector(appRef.injector);
});



