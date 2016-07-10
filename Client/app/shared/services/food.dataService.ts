import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FoodItem } from '../../models/FoodItem';
import { CONFIGURATION } from '../app.constants';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable()
export class FoodDataService {

    private actionUrl: string;

    constructor(private _http: HttpWrapperService) {

        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foods/';
    }

    public GetAllFood = (): Observable<FoodItem[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <FoodItem[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleFood = (id: number): Observable<FoodItem> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public GetRandomFood = (): Observable<FoodItem> => {
        return this._http.get(this.actionUrl + 'getrandomfood')
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public AddFood = (foodItem: FoodItem): Observable<FoodItem> => {
        let toAdd: string = JSON.stringify(foodItem);

        return this._http.post(this.actionUrl, toAdd)
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public UpdateFood = (id: number, foodToUpdate: FoodItem): Observable<FoodItem> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(foodToUpdate))
            .map((response: Response) => <FoodItem>response.json())
            .catch(this.handleError);
    }

    public DeleteFood = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
