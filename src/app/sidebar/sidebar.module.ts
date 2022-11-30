import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { RubriquesComponent } from 'app/rubriques/rubriques.component';

@NgModule({
    imports: [ RouterModule, CommonModule ,HttpClientModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent]
})

export class SidebarModule {}
