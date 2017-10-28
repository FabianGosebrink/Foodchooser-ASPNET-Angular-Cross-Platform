import { CONFIGURATION } from '../app.constants';

export class FoodItem {
    private _imageString = '';
    id: string;
    foodListId: string;
    itemName: string;
    pictureUrl: string;
    created: Date;
    isPublic: Boolean;

    get imageString(): string {
        return this._imageString;
    }

    setImage(imageString: string) {
        if (imageString) {
            this._imageString = CONFIGURATION.baseUrls.server + imageString;
        }
    }
}
