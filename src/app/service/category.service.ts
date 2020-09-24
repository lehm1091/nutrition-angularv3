import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const baseURL = "https://heroku-boot-backend.herokuapp.com/api/categories";
//const baseURL = "http://192.168.0.13:8080/api/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }



  getAll(): Observable<any> {
    return this.http.get(baseURL);
  }
}