import { CONFIGURATION } from '../app.constants';
var FoodItem = (function () {
    function FoodItem() {
        this._imageString = '';
    }
    Object.defineProperty(FoodItem.prototype, "imageString", {
        get: function () {
            return this._imageString;
        },
        enumerable: true,
        configurable: true
    });
    FoodItem.prototype.setImage = function (imageString) {
        if (imageString) {
            this._imageString = CONFIGURATION.baseUrls.server + imageString;
        }
    };
    return FoodItem;
}());
export { FoodItem };
//# sourceMappingURL=foodItem.js.map