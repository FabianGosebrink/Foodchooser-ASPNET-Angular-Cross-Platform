import { DesktopCameraService } from './../services/desktopCamera.service';
import { MobileCameraService } from './../services/mobileCamera.service';
import { PlatformInformationService } from './../services/platformInformation.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CameraFactory {

    constructor(private _platfornInformationService: PlatformInformationService) {

    }

    public getCameraService = (): any => {

        if (this._platfornInformationService.isMobile) {
            return new MobileCameraService();
        }

        return new DesktopCameraService();
    };
}

