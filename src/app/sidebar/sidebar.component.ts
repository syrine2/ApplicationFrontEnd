import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocService } from 'app/bloc.service';
import { RubriquesComponent } from 'app/rubriques/rubriques.component';
import { AuthentificationService } from 'app/services/authentification.service';
import { SerVersionService } from 'app/services/ser-version.service';
import { TokenStorageService } from 'app/services/token-storage.service';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
/*
export const ROUTES: RouteInfo[] = [
   { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
    
];
*/
export const ROUTES =[];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public blocs:any
  public rubriques
  
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private catService:BlocService , private route:ActivatedRoute , private router :Router , private authService : AuthentificationService ,private tokenStorageService: TokenStorageService , private serVersion : SerVersionService) { }

  ngOnInit() {
    //récupération de la version
    const version =this.serVersion.getVersion();
    console.log("version = "+version)
    // recupération du role user
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    this.username = user.username;

    let p1 = this.route.snapshot.params.id;
  //  this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getBlocs(version);
    this.getRubriques(version);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  private getBlocs(version : any){
    console.log("sidebar get blocs")
    this.catService.getListBlocs(version)
    .subscribe(data=>{
      console.log("in get blocs" + data)
      this.blocs = data;
    },err=>{
      console.log("in get blocs error")
      console.log(err);
    })
  }

  private getRubriques(version : any){

    this.catService.getListRubriques(version)
    .subscribe(data=>{
      this.rubriques = data;
    },err=>{

      console.log(err);
    })
  }
  
  
  onLogout(){
   // this.authService.removeTokenFromLocalStorage();
   this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login')
  }
 
}
