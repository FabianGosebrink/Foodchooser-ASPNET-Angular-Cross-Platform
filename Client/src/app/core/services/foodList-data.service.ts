import { EventEmitter, Injectable, Output } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CONFIGURATION } from './../../shared/app.constants';
import { FoodItem } from './../../shared/models/foodItem';
import { FoodList } from './../../shared/models/foodList';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable()
export class FoodListDataService {

    private actionUrl: string;

    constructor(private _http: HttpWrapperService) {

        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foodlists/';
    }

    getAllLists(): Observable<FoodList[]> {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <FoodList[]>response.json())
            .catch(this.handleError);
    }

    getSingleList(id: string): Observable<FoodList> {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <FoodList>response.json())
            .catch(this.handleError);
    }

    getFoodFromList(id: string): Observable<FoodItem[]> {
        return this._http.get(this.actionUrl + id + '/foods')
            .map((response: Response) => <FoodItem[]>response.json())
            .map((foodItems: FoodItem[]) => {
                foodItems.map((foodItem: FoodItem) => {
                    foodItem.created = new Date(String(foodItem.created));
                });
                return foodItems;
            })
            .catch(this.handleError);
    }

    addList(foodListName: string): Observable<FoodList> {
        let toAdd: string = JSON.stringify({ Name: foodListName });

        return this._http.post(this.actionUrl, toAdd)
            .map((response: Response) => <FoodList>response.json())
            .catch(this.handleError);
    }

    updateList(id: string, listToUpdate: FoodList): Observable<FoodList> {
        return this._http.put(this.actionUrl + id, JSON.stringify(listToUpdate))
            .map((response: Response) => <FoodList>response.json())
            .catch(this.handleError);
    }

    deleteList(id: string): Observable<Response> {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    getRandomImageStringFromList(id: string): Observable<string> {
        return this._http.get(this.actionUrl + id + '/getrandomimage')
            .map((response: Response) => <string>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
