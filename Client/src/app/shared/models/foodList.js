import { CONFIGURATION } from './../app.constants';
var FoodList = (function () {
    function FoodList() {
        this._imageString = '';
    }
    Object.defineProperty(FoodList.prototype, "imageString", {
        get: function () {
            return this._imageString;
        },
        enumerable: true,
        configurable: true
    });
    FoodList.prototype.setImage = function (imageString) {
        if (imageString) {
            this._imageString = CONFIGURATION.baseUrls.server + imageString;
        }
    };
    return FoodList;
}());
export { FoodList };
//# sourceMappingURL=foodList.js.map