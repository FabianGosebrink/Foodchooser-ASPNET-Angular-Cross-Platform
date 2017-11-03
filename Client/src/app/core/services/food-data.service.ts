import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { CONFIGURATION } from './../../shared/app.constants';
import { FoodItem } from './../../shared/models/foodItem';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable()
export class FoodDataService {

    private actionUrl: string;

    constructor(private _http: HttpWrapperService) {
        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foods/';
    }

    getAllFood(): Observable<FoodItem[]> {
        return this._http.get<FoodItem[]>(this.actionUrl).pipe(catchError(this.handleError));
    }

    getSingleFood(id: number): Observable<FoodItem> {
        return this._http.get<FoodItem>(this.actionUrl + id).pipe(catchError(this.handleError));
    }

    getRandomFood(): Observable<FoodItem> {
        return this._http.get<FoodItem>(this.actionUrl + 'getrandomfood')
            .pipe(
                map((foodItem: FoodItem) => {

                    foodItem.imageString =
                        CONFIGURATION.baseUrls.server +
                        CONFIGURATION.baseUrls.foodImageFolder +
                        foodItem.imageString;
                    return foodItem;

                }),
                catchError(this.handleError)
            );
    }

    addFood(foodItem: FoodItem): Observable<FoodItem> {
        let toAdd: string = JSON.stringify(foodItem);

        return this._http.post<FoodItem>(this.actionUrl, toAdd).pipe(catchError(this.handleError));
    }

    updateFood(id: string, foodToUpdate: FoodItem): Observable<FoodItem> {
        return this._http.put<FoodItem>(this.actionUrl + id, JSON.stringify(foodToUpdate))
            .pipe(catchError(this.handleError));
    }

    deleteFood(id: number): Observable<object> {
        return this._http.delete(this.actionUrl + id)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpResponse<any>) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
