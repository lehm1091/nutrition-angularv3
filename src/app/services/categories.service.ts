import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const baseURL = "https://heroku-boot-backend.herokuapp.com/api/categories";
//const baseURL = "http://localhost:8080/api/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }



  getAll(): Observable<any> {
    return this.http.get(baseURL);
  }



  

  


}
