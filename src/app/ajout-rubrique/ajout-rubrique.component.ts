import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BlocService } from 'app/bloc.service';
import { Bloc } from 'app/models/bloc.model';
import { SerVersionService } from 'app/services/ser-version.service';
import { logging_v2 } from 'googleapis';

@Component({
  selector: 'app-ajout-rubrique',
  templateUrl: './ajout-rubrique.component.html',
  styleUrls: ['./ajout-rubrique.component.scss']
})
export class AjoutRubriqueComponent implements OnInit {

  form: any = {
    libelle: null,
    zoneDSN: null,
    phase: null,
    commentaire:null,
    bloc : null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  public blocs_ajt :Bloc[]
  blocRb : Bloc;
  


  constructor(private catService:BlocService,private serVersion : SerVersionService) { }

  ngOnInit(): void {

    //récupération de la version
    const version =this.serVersion.getVersion();
    this.getBlocs(version)
  }

  private getBlocs(version : any){
    
    this.catService.getListBlocs(version)
    .subscribe(data=>{
      
      this.blocs_ajt = data;
    },err=>{
      
      console.log(err);
    })
  }

  onSubmit(): void {
    const { libelle, zoneDSN, phase ,commentaire, bloc   } = this.form;
    this.blocRb = {id : bloc} ;
    this.catService.registerRubrique (libelle, zoneDSN, phase ,commentaire,this.blocRb).subscribe(
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
