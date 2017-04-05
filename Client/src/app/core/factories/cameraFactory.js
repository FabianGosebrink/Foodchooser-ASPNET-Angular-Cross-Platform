var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DesktopCameraService } from './../services/desktopCamera.service';
import { MobileCameraService } from './../services/mobileCamera.service';
import { PlatformInformationService } from './../services/platformInformation.service';
import { Injectable } from '@angular/core';
var CameraFactory = (function () {
    function CameraFactory(_platfornInformationService) {
        var _this = this;
        this._platfornInformationService = _platfornInformationService;
        this.getCameraService = function () {
            if (_this._platfornInformationService.isMobile) {
                return new MobileCameraService();
            }
            return new DesktopCameraService();
        };
    }
    return CameraFactory;
}());
CameraFactory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PlatformInformationService])
], CameraFactory);
export { CameraFactory };
//# sourceMappingURL=cameraFactory.js.map