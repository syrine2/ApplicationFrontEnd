import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from './models/bloc.model';
import { Rubrique } from './models/rubrique.model';

const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class BlocService {


  constructor(private http:HttpClient) { }

  public getListBlocs(version : any) : Observable<Bloc[]> {
    console.log("bloc consult : " )
    return this.http.get<Bloc[]>(API_URL + 'bloc/' +version+ '/blocs',{ 
      headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
      }  
});
    
    
  }

  public getListRubriques(version : any) : Observable<Rubrique[]> {
    return this.http.get<Rubrique[]>(API_URL +'app/rubriques',{
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
    }  
    });
  }

    public getRubById(url) : Observable<Rubrique>{

      return this.http.get<Rubrique>(API_URL +'app/'+url,{
        headers: {
          Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
      }  
      });
    }
    

  public patchResource(url,data) : Observable<any> {
    return this.http.put(API_URL+'app/'+url,data,{
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token'),
        
    }  
    });
      
      
  }

  public deleteRubrique(url): Observable<any>{

    return this.http.delete(API_URL+'app/'+url,{
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
    }  
    });
  }

  registerRubrique(libelle: string, zoneDSN: string, phase: string , commentaire : string ,bloc : Bloc ): Observable<any> {
    return this.http.post(API_URL +'app/'+ 'blocs/1/rubriques', {
      libelle,
      zoneDSN,
      phase,
      commentaire,
      bloc
    }, {
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
    }  
    });
  }

  onCreateBloc(data: any){
    return this.http.post(API_URL + 'app/'+'blocs', data,{
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
    }  
    });
  }

  exportExcel(file: string | undefined): Observable<Blob> {
    console.log("begin export Excel")
    return this.http.get(API_URL +'rubrique/export',{
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-token')
    } ,
      responseType: 'blob'
    
     
    });
  }
}



function httpOptions<T>(arg0: string, arg1: { [x: number]: any; Bloc: typeof Bloc; }, httpOptions: any): Observable<any> {
  throw new Error('Function not implemented.');
}

