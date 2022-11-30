import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Version } from 'app/models/version.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/app/';
const VERSION_KEY = 'search-version';
@Injectable({
  providedIn: 'root'
})
export class SerVersionService {

  constructor(private http:HttpClient) { }

  public getListVersons() : Observable<Version[]> {
    console.log("Version consult : " )
    return this.http.get<Version[]>(API_URL + 'versions',{ 
      headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
      }  
});     
  }

  public saveVersion(vrs: any): void {
    window.sessionStorage.removeItem(VERSION_KEY );
    window.sessionStorage.setItem(VERSION_KEY , vrs);
  }

  public getVersion(): any {
    const version = window.sessionStorage.getItem(VERSION_KEY);
    if (version) {
      return version;
    }
    return {};
  }
}
