import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlocService } from 'app/bloc.service';
import { Bloc } from 'app/models/bloc.model';
import { Version } from 'app/models/version.model';
import { SerVersionService } from 'app/services/ser-version.service';
import { version } from 'os';

@Component({
  selector: 'app-blocs',
  templateUrl: './blocs.component.html',
  styleUrls: ['./blocs.component.scss']
})
export class BlocsComponent implements OnInit {

  public blocs : any ;
  public bloc : Bloc = new Bloc ();
  public blocAdd : Bloc = new Bloc ();
  public versionObj : Version = new Version();
  submitted = false;
  
  constructor(private catService:BlocService , private modalService: NgbModal , private blService :BlocService,private serVersion : SerVersionService) { }

  ngOnInit(): void {
    const version =this.serVersion.getVersion();
    this.getBlocs(version);

    this.versionObj = {id : version}  ;
    console.log(" versioobj = ")
    console.log(this.versionObj)
  }

  private getBlocs(version : any){
    console.log("blocs get blocs")
    this.catService.getListBlocs(version)
    .subscribe(data=>{
      console.log("in get blocs" + data)
      this.blocs = data;
    },err=>{
      console.log("in get blocs error")
      console.log(err);
    })
  }

  displayStyle = "none";
  
  openPopup(b : Bloc) {
    this.displayStyle = "block";
    this.bloc = b ;
  }
  closePopup() {
    this.displayStyle = "none";
  }

  onUpdateBloc(data){
    let url = "blocs/"+this.bloc.id;
    console.log(this.bloc.id)
      this.blService.patchResource(url,data)
      .subscribe(d=>{
  
        this.bloc = d;
        this.displayStyle = "none";

      },err=>{
        console.log(err);
  
      })
    }

    ondeletebloc(id){
      let url = "blocs/"+id;
      console.log("syrine delete url "+url)
      this.blService.deleteRubrique(url)
      .subscribe(rm=>{

        console.log("syrine delete rm")
      },err=>{
        console.log("syrine delete erreur")
        console.log(err)
      })
       
    }

    displayStyleAdd = "none";
  
    openPopupAdd() {
      this.displayStyleAdd = "block";

    }
    closePopupAdd() {
      this.displayStyleAdd = "none";
      this.submitted = false;
    }

    onCreateBloc(data){

      this.blocAdd.version = this.versionObj ;

      this.blService.onCreateBloc(this.blocAdd).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)

      });
    }
}
