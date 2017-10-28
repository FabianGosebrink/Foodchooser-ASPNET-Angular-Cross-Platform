import { CONFIGURATION } from './../app.constants';
var FoodList = (function () {
    function FoodList() {
    }
    return FoodList;
}());
export { FoodList };
var FoodListWithImage = (function () {
    function FoodListWithImage(list, imageString) {
        this.FoodListItem = list;
        this.ImageString = null;
        if (imageString) {
            this.ImageString = CONFIGURATION.baseUrls.server + imageString;
        }
    }
    return FoodListWithImage;
}());
export { FoodListWithImage };
//# sourceMappingURL=foodList.js.map