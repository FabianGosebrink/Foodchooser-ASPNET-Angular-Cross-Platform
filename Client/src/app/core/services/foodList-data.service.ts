import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

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
        return this._http.get<FoodList[]>(this.actionUrl)
            .pipe(catchError(this.handleError));
    }

    getSingleList(id: string): Observable<FoodList> {
        return this._http.get<FoodList>(this.actionUrl + id)
            .pipe(catchError(this.handleError));
    }

    getFoodFromList(id: string): Observable<FoodItem[]> {
        return this._http.get<FoodItem[]>(this.actionUrl + id + '/foods')
            .pipe(
            map((foodItems: FoodItem[]) => {
                foodItems.map((foodItem: FoodItem) => {
                    foodItem.created = new Date(String(foodItem.created));
                    foodItem.imageString =
                        CONFIGURATION.baseUrls.server +
                        CONFIGURATION.baseUrls.foodImageFolder +
                        foodItem.imageString;
                    console.log(foodItem.imageString);
                });
                return foodItems;
            }),
            catchError(this.handleError));
    }

    addList(foodListName: string): Observable<FoodList> {
        let toAdd: string = JSON.stringify({ Name: foodListName });

        return this._http.post<FoodItem[]>(this.actionUrl, toAdd)
            .pipe(catchError(this.handleError));
    }

    updateList(id: string, listToUpdate: FoodList): Observable<FoodList> {
        return this._http.put<FoodList>(this.actionUrl + id, JSON.stringify(listToUpdate))
            .pipe(catchError(this.handleError));
    }

    deleteList(id: string): Observable<object> {
        return this._http.delete(this.actionUrl + id)
            .pipe(catchError(this.handleError));
    }

    getRandomImageStringFromList(id: string): Observable<string> {
        return this._http.get<string>(this.actionUrl + id + '/getrandomimage')
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpResponse<any>) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
