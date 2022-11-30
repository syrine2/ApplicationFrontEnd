import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlocService } from 'app/bloc.service';
import { Version } from 'app/models/version.model';
import { SerVersionService } from 'app/services/ser-version.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public versions : Version[]
  version :null ;

  constructor(private serVersion : SerVersionService , private router: Router , private blservice : BlocService) { }

  ngOnInit() {
 
          // recuperation version
          this.getVersions();
          console.log("version" + this.version);
    }

    private getVersions(){
    
      this.serVersion.getListVersons()
      .subscribe(data=>{
        
        this.versions = data;
      },err=>{
        
        console.log(err);
      })
    }
    search(){
      this.serVersion.saveVersion(this.version);
    }

    exporter(filename: string): void{
      this.blservice.exportExcel(filename).subscribe(blob => saveAs(blob, filename));;
    }
}


