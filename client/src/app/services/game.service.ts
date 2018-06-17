import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IngredientPayload {
  id: Number;
  name: String;
  quantity: Number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public getIngredients(): Observable<any> {
    return this.http.get('/api/ingredients');
  }
  public getPotions(): Observable<any> {
    return this.http.get('/api/potions');
  }
  public checkIngredients(ingredients): Observable<any> {
    console.log(ingredients);
    return this.http.post(`/api/validation`, ingredients);
  }
}
