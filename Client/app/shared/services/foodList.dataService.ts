
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FoodList } from '../../models/FoodList';
import { FoodItem } from '../../models/FoodItem';
import { CONFIGURATION } from '../app.constants';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable()
export class FoodListDataService {

    private actionUrl: string;

    @Output() foodListAdded: EventEmitter<any> = new EventEmitter();
    
    constructor(private _http: HttpWrapperService) {

        this.actionUrl = CONFIGURATION.baseUrls.server +
            CONFIGURATION.baseUrls.apiUrl +
            'foodlists/';
    }

    public GetAllLists = (): Observable<FoodList[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <FoodList[]>response.json())
            .catch(this.handleError);
    }

    public GetSingleList = (id: number): Observable<FoodList> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <FoodList>response.json())
            .catch(this.handleError);
    }

    public GetFoodFromList = (id: number): Observable<FoodItem[]> => {
        return this._http.get(this.actionUrl + id + '/foods')
            .map((response: Response) => <FoodItem[]>response.json())
            .do(this.setDate)
            .catch(this.handleError);
    }

    private setDate(foodItems: FoodItem[]) {
        for (var index = 0; index < foodItems.length; index++) {
            var element: FoodItem = foodItems[index];
            element.Created = new Date(String(element.Created));
        }
    }

    public AddList = (foodListName: string): Observable<FoodList> => {
        let toAdd: string = JSON.stringify({ Name: foodListName });

        return this._http.post(this.actionUrl, toAdd)
            .map((response: Response) => <FoodList>response.json())
            .do((addedList) => this.foodListAdded.emit(addedList))
            .catch(this.handleError);
    }

    public UpdateList = (id: number, listToUpdate: FoodList): Observable<FoodList> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(listToUpdate))
            .map((response: Response) => <FoodList>response.json())
            .catch(this.handleError);
    }

    public DeleteList = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    public GetRandomImageStringFromList = (id: number): Observable<string> => {
        return this._http.get(this.actionUrl + id + "/getrandomimage")
            .map((response: Response) => <string>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
