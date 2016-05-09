import { CanActivate, ComponentInstruction, Router} from '@angular/router-deprecated';
import { Injector } from '@angular/core';
import { appInjector } from '../shared/services/appInjector';
import { StorageService } from '../shared/services/storage.service';

export const NeedsAuthentication = () => {
    return CanActivate((to: ComponentInstruction, from: ComponentInstruction, target = ['/']) => {
        let injector: Injector = appInjector();
        let router: Router = injector.get(Router);
        let storageService: StorageService = injector.get(StorageService);

        if (storageService.getItem('auth')) {
            return true;
        }

        router.navigate(['/Login', { target }]);

        return false;
    });
}