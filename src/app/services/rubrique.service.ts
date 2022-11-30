import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL = 'http://localhost:8080/api/app/';
@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  constructor(private http:HttpClient) { }
}
