import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BlocService } from 'app/bloc.service';
import { Rubrique } from 'app/models/rubrique.model';
import { AuthentificationService } from 'app/services/authentification.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { concatMap, tap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
declare var $:any;
@Component({
  selector: 'app-rubriques',
  templateUrl: './rubriques.component.html',
  styleUrls: ['./rubriques.component.css']
})
export class RubriquesComponent implements OnInit {

  public rubrique : Rubrique = new Rubrique();
  fCon: String[];
  id: string;
  public test : boolean
  public mode : number =0;
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isDelSuccessful = false;
  constructor(private route : ActivatedRoute , private blService :BlocService , private router : Router , public authService : AuthentificationService ,private tokenStorageService: TokenStorageService) {
   
   /* router.events.subscribe((event) =>{
      console.log(event);
    })*/
  
      this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          //do something on start activity
          let P1 = this.route.snapshot.params.id;
          let url1 = "rubriques/"+P1
          this.getRubrique(url1);
          this.mode =0;
      }

      if (event instanceof NavigationError) {
          // Handle error
          console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        let P1 = this.route.snapshot.params.id;
          let url1 = "rubriques/"+P1
          this.getRubrique(url1);
          this.mode =0;
      }
  }); 

   }

  ngOnInit(): void {

    const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
  /*  this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
       let url = val.url;
       console.log(url)
   
       let P1 = this.route.snapshot.params.id;
      console.log(this.route.snapshot.params.id)
      let url1 = "/rubriques/"+P1
      this.getRubrique(url1);
      }
    }); 
*/
}  
     
  
 
  private getRubrique(url){
    this.blService.getRubById(url)
    .subscribe(data =>
      {this.rubrique = data ;},
      err=>{
        console.log(err);
      })

  }

  onEditProduct(){
    this.mode=1;

    
  }
  onUpdateProduct(data){
  let url = "rubriques/"+this.rubrique.id;
    this.blService.patchResource(url,data)
    .subscribe(d=>{

      this.rubrique = d;
      this.mode = 0;
    },err=>{
      console.log(err);

    })
  }
  ondeleterubrique(){
    let url = "rubriques/"+this.rubrique.id;
    console.log("syrine delete url "+url)
    this.blService.deleteRubrique(url)
    .subscribe(rm=>{
      this.mode =3;
      this.isDelSuccessful =true;
      console.log("syrine delete rm")
    },err=>{
      console.log("syrine delete erreur")
      console.log(err)
    })

    
  }
}
