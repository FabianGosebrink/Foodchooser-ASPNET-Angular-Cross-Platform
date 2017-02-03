import { CONFIGURATION } from './../app.constants';
export var FoodList = (function () {
    function FoodList() {
    }
    return FoodList;
}());
export var FoodListWithImage = (function () {
    function FoodListWithImage(list, imageString) {
        this.FoodListItem = list;
        this.ImageString = null;
        if (imageString) {
            this.ImageString = CONFIGURATION.baseUrls.server + imageString;
        }
    }
    return FoodListWithImage;
}());
//# sourceMappingURL=foodList.js.map