import { CONFIGURATION } from '../app.constants';

export class FoodItem {
    id: string;
    foodListId: string;
    itemName: string;
    pictureUrl: string;
    created: Date;
    isPublic: Boolean;
    imageString: string;
}
