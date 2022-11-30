import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    admin:null,
  };
  public role : any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor( private authService : AuthentificationService ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password ,admin  } = this.form;
    if(admin != null)
    {  this.role = []
       this.role[0] = "admin";
    }
    this.authService.register(username, email, password,this.role).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
