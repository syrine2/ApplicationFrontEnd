import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'app/services/authentification.service';
import { TokenStorageService } from 'app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  focus: any;
  focus1: any;
  constructor(private authService : AuthentificationService ,private tokenStorage: TokenStorageService, private router : Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log("get token")
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl('')
    }
  }

  onLogin(value : any){
    console.log("IN FUNCTIOn onLogin");
    this.authService.login(value.username , value.password).subscribe(
      data => {
        console.log("IN FUNCTIOn onLogin1");
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigateByUrl('')
       // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log("onSubmit 3")
      }
    );

    if(this.isLoggedIn){
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl('')

    }
  }

 
  reloadPage(): void {
    window.location.reload();
  }
}
