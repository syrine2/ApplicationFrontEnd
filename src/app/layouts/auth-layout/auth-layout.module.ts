import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(AuthLayoutRoutes),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthLayoutModule { }
