import { Injectable } from '@angular/core';

import { DesktopCameraService } from './../services/desktopCamera.service';
import { MobileCameraService } from './../services/mobileCamera.service';
import { PlatformInformationService } from './../services/platformInformation.service';

@Injectable()
export class CameraFactory {

    constructor(private _platfornInformationService: PlatformInformationService) {

    }

    getCameraService(): any {

        if (this._platfornInformationService.isMobile) {
            return new MobileCameraService();
        }

        return new DesktopCameraService();
    };
}

