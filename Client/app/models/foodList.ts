
import { FoodItem } from './FoodItem';

export class FoodList {
    public Id: number;
    public Name: string;
    public Foods: FoodItem[];
}

export class FoodListWithImage {
    FoodListItem: FoodList;
    ImageString: string;

    constructor(list: FoodList, imageString: string) {
        this.FoodListItem = list;
        this.ImageString = imageString;
    }
}
