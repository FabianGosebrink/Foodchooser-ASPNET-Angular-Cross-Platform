import { FoodItem } from './../../shared/models/foodItem';
import { CONFIGURATION } from './../../shared/app.constants';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable()
export class FoodDataService {

    private actionUrl: string;

    constructor(private _http: HttpWrapperService) {
        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foods/';
    }

    public getAllFood(): Observable<FoodItem[]> {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <FoodItem[]>response.json())
            .catch(this.handleError);
    }

    public getSingleFood(id: number): Observable<FoodItem> {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public getRandomFood(): Observable<FoodItem> {
        return this._http.get(this.actionUrl + 'getrandomfood')
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public addFood(foodItem: FoodItem): Observable<FoodItem> {
        let toAdd: string = JSON.stringify(foodItem);

        return this._http.post(this.actionUrl, toAdd)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public updateFood(id: string, foodToUpdate: FoodItem): Observable<FoodItem> {
        return this._http.put(this.actionUrl + id, JSON.stringify(foodToUpdate))
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public deleteFood(id: number): Observable<Response> {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
