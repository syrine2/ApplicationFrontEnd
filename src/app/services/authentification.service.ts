import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConfigLoadStart } from '@angular/router';
import { Console } from 'console';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public users =[
    {username :'admin' , password :'1234', roles :['ADMIN','USER']},
    {username :'user1' , password :'1234', roles :['USER']},
    {username :'user2' , password :'1234', roles :['USER']}
  ];

  public isAuthentificated : boolean ;
  public userAuthentificated ;
  public token : string ;


  constructor(private http: HttpClient) { }
    login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
/*  public login (username:string , password:string){
    let user;
    console.log("user = ")
    console.log(this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions))
    this.users.forEach(u=>{
      if(u.username == username && u.password == password){
        user = u;
        this.token =btoa(JSON.stringify({username :u.username , roles : u.roles}));
      }
    });
    if(user){

      this.isAuthentificated =true
      this.userAuthentificated = user
    }else{

      this.isAuthentificated = false
      this.userAuthentificated = undefined
    }
  }

  public isAdmin(){
    console.log("yes1")
    console.log(this.userAuthentificated)
    if(this.userAuthentificated){
      console.log("yes2")
      console.log("oui" +this.userAuthentificated.roles.indexOf('ADMIN'))
      if(this.userAuthentificated.roles.indexOf('ADMIN') > -1)
        return true;

    }
    return false;
  }*/

  public saveAuthentificatedUser (){
    if(this.userAuthentificated){
      localStorage.setItem('authToken',this.token);
    }

  }

  public loadAuthentificatedUserFromLocalStorage(){
    console.log("load0")
    let t = localStorage.getItem('authToken');
    console.log(JSON.parse(atob(t)))
    if(t){
      let user = JSON.parse(atob(t));
      console.log("load1"+user)
      this.userAuthentificated ={username: user.username , roles: user.roles}
      console.log("load2"+this.userAuthentificated)
      this.isAuthentificated = true
      this.token = t;
    }
  }

  public removeTokenFromLocalStorage (){
    localStorage.removeItem('authToken');
    this.isAuthentificated = false
    this.token = undefined ;
    this.userAuthentificated = false;
  }

  register(username: string, email: string, password: string ,role : any ): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      role
    }, httpOptions);
  }
}
