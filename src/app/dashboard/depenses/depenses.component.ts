import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { DepensesService } from './depenses.service';
import { Depenses } from './depenses';
import { CatDepenses } from './catdepenses';
import { Client } from '../client/client';
import { Document } from '../document';

@Component({
   selector: 'app-depenses',
   templateUrl: './depenses.component.html',
   //styleUrls: ['./contrat.component.css']
})
export class DepensesComponent implements OnInit { 
   //Component properties
   allDepenses: Depenses[];
   allCatDepenses: String[];
   allClients: String[];
    allDocuments: Document[];
	idUser:string;
   documentDep: Document;
   descCatDepText=null;
   statusCode: number;
   requestProcessing = false;
   depensesIdToUpdate = null;
   processValidation = false;
   //Create form
   depensesForm = new FormGroup({
	client: new FormControl(''),
	typeDepenses:  new FormControl('', Validators.required),
	valeur: new FormControl('',Validators.required),
	titreDep: new FormControl('',Validators.required),
	descriptionDep: new FormControl('',Validators.required),
	author: new FormControl('',Validators.required),
	titreCatDepenses: new FormControl(''),
	titreCatDepensesEng: new FormControl(''),
	descCatDep: new FormControl('') 
   });
   //Create constructor to get service instance
   constructor(private depensesService: DepensesService,private router: Router) {
   }
   //Create ngOnInit() and load depenses
   ngOnInit(): void {
	   this.depensesService.getIdUser().subscribe(id =>{this.idUser=id;
	   		this.depensesForm.setValue({client:null,typeDepenses: null,valeur: null,titreDep: null,descriptionDep: null,author: this.idUser,titreCatDepenses: null,titreCatDepensesEng:null,descCatDep:null});
	   this.getAllDepenses();
	   this.getAllCatDepenses();
	   this.getAllClientsNames();
	   },errorCode => this.statusCode = errorCode);
	   
   }  
	//Fetch all documents
   getAllDocuments() {
        this.depensesService.getAllDocuments()
	   .subscribe(
                data => this.allDocuments = data,
                errorCode =>  this.statusCode = errorCode);   
   }   
   //Fetch all depenses
   getAllDepenses() {
        this.depensesService.getAllDepenses()
	   .subscribe(
                data => this.allDepenses = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   
    //Fetch all Categories depenses
   getAllCatDepenses() {
        this.depensesService.getAllCatDepenses()
	   .subscribe(
                data => this.allCatDepenses = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all Clients
   getAllClientsNames() {
        this.depensesService.getAllClientsNames()
	   .subscribe(
                data => this.allClients = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update depenses
   onDepensesFormSubmit() {
	  this.processValidation = true;   
	  if (this.depensesForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
          this.preProcessConfigurations();
		  let nomClient= this.depensesForm.get('client').value;
		  let titreDep = this.depensesForm.get('titreDep').value;
		  let typeDepenses = this.depensesForm.get('typeDepenses').value;
	      let valeur = this.depensesForm.get('valeur').value;
	      let descriptionDep = this.depensesForm.get('descriptionDep').value;
	      let author = this.depensesForm.get('author').value;
		  let titreCatDepenses;
		  let titreCatDepensesEng;
		  let descCatDep;
		  if(this.descCatDepText===null){
			  titreCatDepenses = this.depensesForm.get('titreCatDepenses').value;
		  }
	      else {
			  titreCatDepensesEng = this.depensesForm.get('titreCatDepensesEng').value;
			  descCatDep=this.depensesForm.get('descCatDep').value;
		  }
		  
		
	  if (this.depensesIdToUpdate === null && this.descCatDepText === null) {  
	    //Handle create depenses
		if(nomClient=== null) { 
		this.depensesService.getCatDepensesByTitre(titreCatDepenses).subscribe(catDep =>{
			let depenses= new Depenses(this.depensesIdToUpdate,typeDepenses,valeur,titreDep,descriptionDep,this.idUser,catDep,null);
			this.depensesService.createDepenses(depenses)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
					  this.depensesService.getDepensesByTitre(titreDep).subscribe(depenses =>{
					this.documentDep.depenses=depenses;
					this.documentDep.author=this.idUser;
					this.depensesService.createDocument(this.documentDep)
					.subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllDepenses();
					this.getAllCatDepenses();
					this.getAllClientsNames();
			      this.backToCreateDepenses();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
			      
			},
		    errorCode => this.statusCode = errorCode);},
		    errorCode =>  this.statusCode = errorCode);
	  }else{
		this.depensesService.getClientByNom(nomClient).subscribe(client =>{
		this.depensesService.getCatDepensesByTitre(titreCatDepenses).subscribe(catDep =>{
			let depenses= new Depenses(this.depensesIdToUpdate,typeDepenses,valeur,titreDep,descriptionDep,this.idUser,catDep,client);
			this.depensesService.createDepenses(depenses)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
					  this.depensesService.getDepensesByTitre(titreDep).subscribe(depenses =>{
					this.documentDep.depenses=depenses;
					this.documentDep.author=this.idUser;
					this.depensesService.createDocument(this.documentDep)
					.subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllDepenses();
					this.getAllCatDepenses();
					this.getAllClientsNames();
			      this.backToCreateDepenses();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
			},
			errorCode => this.statusCode = errorCode);},
		    errorCode => this.statusCode = errorCode);},
	  errorCode =>  this.statusCode = errorCode);}
	  } else if(this.depensesIdToUpdate === null && this.descCatDepText === 1) {
		  //create Categorie Depenses and Depenses
		  let catDepenses= new CatDepenses(null,titreCatDepensesEng,descCatDep,this.idUser);
		  this.depensesService.createCatDepenses(catDepenses).subscribe(successCode => {
		  this.statusCode = successCode;
		  this.depensesService.getClientByNom(nomClient).subscribe(client =>{
		  this.depensesService.getCatDepensesByTitre(titreCatDepensesEng).subscribe(catDep =>{
			let depenses= new Depenses(this.depensesIdToUpdate,typeDepenses,valeur,titreDep,descriptionDep,this.idUser,catDep,client);
			this.depensesService.createDepenses(depenses)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllDepenses();
					this.getAllCatDepenses();
					this.getAllClientsNames();
				  
			      this.backToCreateDepenses();
			},
			errorCode => this.statusCode = errorCode);},
		    errorCode => this.statusCode = errorCode);},
		    errorCode =>  this.statusCode = errorCode);},
		        errorCode => this.statusCode = errorCode);
		  	
	  }else if(this.descCatDepText === 1){
		  // create new Categorie Depenses and update depenses
		  let catDepenses= new CatDepenses(null,titreCatDepenses,descCatDep,this.idUser);
		  this.depensesService.createCatDepenses(catDepenses).subscribe(successCode => {
		  this.statusCode = successCode;
		  this.depensesService.getClientByNom(nomClient).subscribe(client =>{
		  this.depensesService.getCatDepensesByTitre(titreCatDepenses).subscribe(catDep =>{
			let depenses= new Depenses(this.depensesIdToUpdate,typeDepenses,valeur,titreDep,descriptionDep,this.idUser,catDep,client);
				    this.depensesService.updateDepenses(depenses)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllDepenses();
					this.getAllCatDepenses();
				  this.getAllClientsNames();
			      this.backToCreateDepenses();
			},
		        errorCode => this.statusCode = errorCode);},
		  errorCode =>  this.statusCode = errorCode);},
		  errorCode =>  this.statusCode = errorCode);},
		  errorCode => this.statusCode = errorCode);
		  
	  }else{   
   	    //Handle update depenses only
		if(nomClient== null){
					this.depensesService.getCatDepensesByTitre(titreCatDepenses).subscribe(catDep =>{
			let depenses= new Depenses(this.depensesIdToUpdate,typeDepenses,valeur,titreDep,descriptionDep,this.idUser,catDep,null);
				    this.depensesService.updateDepenses(depenses)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllDepenses();
					this.getAllCatDepenses();
				  this.getAllClientsNames();
			      this.backToCreateDepenses();
			},
				errorCode => this.statusCode = errorCode);},
		    errorCode =>  this.statusCode = errorCode);
		}else{
					this.depensesService.getClientByNom(nomClient).subscribe(client =>{
		this.depensesService.getCatDepensesByTitre(titreCatDepenses).subscribe(catDep =>{
			let depenses= new Depenses(this.depensesIdToUpdate,typeDepenses,valeur,titreDep,descriptionDep,this.idUser,catDep,client);
				    this.depensesService.updateDepenses(depenses)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllDepenses();
					this.getAllCatDepenses();
				  this.getAllClientsNames();
			      this.backToCreateDepenses();
			},
		        errorCode => this.statusCode = errorCode);},
				errorCode => this.statusCode = errorCode);},
		    errorCode =>  this.statusCode = errorCode);
	  
		}

	  }
   }

   //Load depenses by id to edit
   loadDepensesToEdit(idDepenses: string) {
      this.preProcessConfigurations();
      this.depensesService.getDepensesById(idDepenses)
	      .subscribe(depenses => {
		            this.depensesIdToUpdate = depenses.idDepenses;
					if (depenses.clientDep=== null){
		            this.depensesForm.setValue({client:"",typeDepenses: depenses.typeDepenses,valeur: depenses.valeur,titreDep: depenses.titreDep,descriptionDep: depenses.descriptionDep,author: depenses.author,titreCatDepenses: depenses.catDepenses.titreCatDep,titreCatDepensesEng:null,descCatDep:null});
					}
					else{
		            this.depensesForm.setValue({client: depenses.clientDep.nomClient,typeDepenses: depenses.typeDepenses,valeur: depenses.valeur,titreDep: depenses.titreDep,descriptionDep: depenses.descriptionDep,author: depenses.author,titreCatDepenses: depenses.catDepenses.titreCatDep,titreCatDepensesEng:null,descCatDep:null});
					}
				this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete depenses
    deleteDepensesById(idDepenses: string) {
      this.preProcessConfigurations();
      this.depensesService.deleteDepensesById(idDepenses)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllDepenses();	
			  this.getAllCatDepenses();

		      this.backToCreateDepenses();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateDepenses() {
          this.depensesIdToUpdate = null;
		  this.descCatDepText = null;
          this.depensesForm.reset();	  
	  this.processValidation = false;
   }
   //Create Categorie Depenses Button click
    buttonCreateCatDep() {
          this.descCatDepText = 1;
   }
   //Create Client Button click
	buttonCreateClient() {
		this.router.navigate(['./client']);
   }
   //upload file
   uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:8080/user/upload'
  };
  sizeLimit = 64000000;
 
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
	  
    }
  }
 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }
   //get file name
   fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    let fileName = file.name;
	this.documentDep= new Document(null,fileName,null,"ressources/"+fileName,null,null,null,null,null,null,null);
	
	}
} 
