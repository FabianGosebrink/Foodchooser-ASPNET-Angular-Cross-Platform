import { CONFIGURATION } from './../app.constants';
import { FoodItem } from './FoodItem';

export class FoodList {
    private _imageString = '';
    id: string;
    name: string;
    foods: FoodItem[];
    get imageString(): string {
        return this._imageString;
    }

    setImage(imageString: string) {
        if (imageString) {
            this._imageString = CONFIGURATION.baseUrls.server + imageString;
        }
    }
}
