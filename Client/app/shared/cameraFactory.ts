import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PlatformInformationService } from './services/platformInformation.service';
import { MobileCameraService } from './services/mobileCameraService';
import { DesktopCameraService } from './services/desktopCameraService';

@Injectable()
export class CameraFactory {


    constructor(private _platfornInformationService: PlatformInformationService) {

    }

    public getCameraService = (): any => {

        if (this._platfornInformationService.isMobile) {
            console.log("MobileCameraService");
            return new MobileCameraService();
        }

        console.log("DesktopCameraService");
        return new DesktopCameraService();
    };
}

