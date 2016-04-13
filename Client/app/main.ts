import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import { ComponentRef, provide, enableProdMode, bind } from 'angular2/core';
import { APP_BASE_HREF, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
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
]).then((appRef: ComponentRef) => {
    appInjector(appRef.injector);
});



