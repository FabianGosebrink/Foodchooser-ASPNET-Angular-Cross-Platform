import { AuthenticationService } from  './authentication.service';
import { HttpWrapperService } from './httpWrapper.service';
import { CurrentUserService } from './currentUser.service';
import { StorageService } from './storage.service';
import { NeedsAuthentication } from '../../decorators/needsAuthentication';
import { PlatformInformationService } from './platformInformation.service';


export class Services {
    public static allServices = [

        AuthenticationService,
        HttpWrapperService,
        CurrentUserService,
        StorageService,
        NeedsAuthentication,
        PlatformInformationService
    ];
}