import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { ReturnStatement } from '@angular/compiler';

const baseURL = "https://heroku-boot-backend.herokuapp.com/api";
//const baseURL = "http://192.168.0.11:8080/api";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(baseURL + '/foods/');
  }

  getTop10(): Observable<any> {
    return this.http.get(baseURL + '/foods/?page=0&size=10&sort=id,desc');
  }

  getByCategoryName(name: string): Observable<any> {
    return this.http.get(`${baseURL}/categories/${name}/foods`);
  }

  getAllByIds(ids): Observable<any> {
    return this.http.get(`${baseURL}/foods/?ids=${ids}`);
  }

  getOneById(id): Observable<any> {
    return this.http.get(`${baseURL}/foods/${id}`);
  }

  deleteOneById(id): Observable<any> {
    return this.http.delete(`${baseURL}/foods/${id}`);
  }



  create(data): Observable<any> {
    return this.http.post(`${baseURL}/foods`, data);
  }

  update(data, id): Observable<any> {
    return this.http.put(`${baseURL}/foods/${id}`, data);
  }

  addCategories(productId, categoriesIds: number[]): Observable<any> {
    return this.http.put(`${baseURL}/foods/${productId}/add-categories`, categoriesIds);
  }



  findByName(name): Observable<any> {
    return this.http.get(`${baseURL}/foods/?name=${name}`);
  }







}
