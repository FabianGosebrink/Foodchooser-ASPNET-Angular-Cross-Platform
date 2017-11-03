import { ICameraService } from './camera.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

declare let window: any;

export class DesktopCameraService implements ICameraService {

    constructor() {
        console.log('DesktopCameraService');
    }

    private getMediaDevices(): any {
        const mediaDevices = ((window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia) ? {
            getUserMedia: function (options: any) {
                return new Promise((resolve, reject) => {
                    (window.navigator.mozGetUserMedia ||
                        window.navigator.webkitGetUserMedia).call(window.navigator, options, resolve, reject);
                });
            }
        } : null) || window.navigator.mediaDevices;

        return mediaDevices;
    }

    public getPhoto(): Observable<string> {
        return Observable.create((observer: any) => {
            this.getMediaDevices()
                .getUserMedia({ video: true, audio: false })
                .then((stream: any) => {
                    let vendorURL = window.URL || window.webkitURL;
                    let doc = document;
                    let videoElement = doc.createElement('video');
                    videoElement.src = vendorURL.createObjectURL(stream);
                    videoElement.play();

                    let takePhotoInternal = () => {
                        let canvasElement = doc.createElement('canvas');
                        canvasElement.setAttribute('width', videoElement.videoWidth.toString());
                        canvasElement.setAttribute('height', videoElement.videoHeight.toString());

                        // Wait a bit before taking a screenshot so the camera has time to adjust lights
                        setTimeout(() => {
                            let context = canvasElement.getContext('2d');
                            context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

                            let url = canvasElement.toDataURL('image/png');

                            videoElement.pause();

                            if (stream.stop) {
                                stream.stop();
                            }

                            if (stream.getAudioTracks) {
                                stream.getAudioTracks().forEach((track: any) => {
                                    track.stop();
                                });
                            }

                            if (stream.getVideoTracks) {
                                stream.getVideoTracks().forEach((track: any) => {
                                    track.stop();
                                });
                            }

                            observer.next(url);
                            observer.complete();

                        }, 500);
                    };

                    if (videoElement.readyState >= videoElement.HAVE_FUTURE_DATA) {
                        takePhotoInternal()
                    } else {
                        videoElement.addEventListener('canplay', function () {
                            takePhotoInternal()
                        }, false);
                    }

                }, ((error: any) => {
                    console.log(error);
                }));
        });
    }
}
