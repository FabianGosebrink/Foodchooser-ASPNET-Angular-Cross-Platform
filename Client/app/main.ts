import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { ComponentRef, provide, enableProdMode, bind } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common/index';
import { HTTP_PROVIDERS } from '@angular/http';
import { HttpWrapperService } from './shared/services/httpWrapper.service';
import { StorageService } from './shared/services/storage.service';
import { CurrentUserService } from './shared/services/currentUser.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { appInjector } from './shared/services/appInjector';
import { HeaderComponent } from  './components/header/header.component';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    HttpWrapperService,
    CurrentUserService,
    StorageService,
    HeaderComponent,
    AuthenticationService,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    //bind(LocationStrategy).toClass(HashLocationStrategy),
    provide(APP_BASE_HREF, {useValue: '/'})
]).then((appRef: ComponentRef<AppComponent>) => {
    appInjector(appRef.injector);
});



