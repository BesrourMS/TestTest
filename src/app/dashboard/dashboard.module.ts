import { NgModule } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { RouterModule }   from '@angular/router';
 import { Ng2UploaderModule } from 'ng2-uploader';
import { ImageUploadModule } from "angular2-image-upload";

import { ClientComponent }  from './client/client.component';
import { ContratComponent }  from './contrat/contrat.component';
import { ProprieteComponent }  from './propriete/propriete.component';
import { DepensesComponent }  from './depenses/depenses.component';
import { CatTaxonomieComponent } from './cattaxonomie/cattaxonomie.component';
import { PayementComponent }  from './payement/payement.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './can-activate.authguard';
import { Signup } from './signup/signup';

import { ClientService }  from './client/client.service';
import { ProprieteService }  from './propriete/propriete.service';
import { ContratService } from './contrat/contrat.service';
import { DepensesService }  from './depenses/depenses.service';
import { CatTaxonomieService }  from './cattaxonomie/cattaxonomie.service';
import { PayementService }  from './payement/payement.service';
import { AuthenticationService } from './authentication.service';
import {  TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate'; 

import { MODULEROUTES } from "./dashboard.routes";

@NgModule({
  imports: [     
        BrowserModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	Ng2UploaderModule,
	ImageUploadModule.forRoot(), 
	MODULEROUTES
  ],
  declarations: [
		
		ClientComponent,
		ContratComponent,
		ProprieteComponent,
		DepensesComponent,
		CatTaxonomieComponent,
		LoginComponent,
		Signup,
		PayementComponent,
		TranslatePipe
  ],
  providers: [
		ClientService,
        ContratService,
		ProprieteService,
		DepensesService,
		CatTaxonomieService,
		PayementService,
		AuthenticationService,
		CanActivateAuthGuard,
	TRANSLATION_PROVIDERS, TranslateService

  ],
})
export class DashboardModule { } 