import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ContratService } from './contrat.service';
import { Contrat } from './contrat';
import { ModelContrat } from './modelcontrat';
import { Propriete } from '../propriete/propriete';
import { Client } from '../client/client';
import { Document } from '../document';

@Component({
   selector: 'app-contrat',
   templateUrl: './contrat.component.html',
   //styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit { 
   //Component properties
   allContrats: Contrat[];
   allModelContrats: String[];
   allProprietes: String[];
   allClients: String[];
   allDocuments: Document[];
   documentContrat:Document;
   clients: Client[];
   statusCode: number;
   idUser: string;
   textModelContrat=null;
   requestProcessing = false;
   contratIdToUpdate = null;
   processValidation = false;
   //Create form
   contratForm = new FormGroup({
	   	proprietaire: new FormControl(''),
		client: new FormControl(''),
		dateContrat:  new FormControl('', Validators.required),
		honoraire: new FormControl('', Validators.required),
		montantVente: new FormControl('', Validators.required),
		montantLocation: new FormControl('', Validators.required),
		dateDebut: new FormControl('', Validators.required),
		periodeMontant: new FormControl('', Validators.required),
		dateFin: new FormControl('', Validators.required),
		dateNotification: new FormControl('', Validators.required),
		notRenou: new FormControl('', Validators.required),
		caution: new FormControl('', Validators.required),
		titrePropriete: new FormControl(''),
		author: new FormControl('', Validators.required),
		titreContrat: new FormControl('', Validators.required),
		titreModelContrat: new FormControl(''),
	    titreModelContratEnr: new FormControl(''),
		descModelContrat: new FormControl('')
   });
   //Create constructor to get service instance
   constructor(private contratService: ContratService,private router: Router) {
   }
   //Create ngOnInit() and load contrats
   ngOnInit(): void {
	   this.contratService.getIdUser().subscribe(id =>{this.idUser=id;
	   this.getAllContrats();
	   	   this.getAllModelContrats();
		   this.getAllProprietes();
		   this.getAllClientsNames();
	   },errorCode => this.statusCode = errorCode);
	   
   }   
   //Fetch all contrats
   getAllContrats() {
        this.contratService.getAllContrats()
	   .subscribe(
                data => this.allContrats = data,
                errorCode =>  this.statusCode = errorCode);   
   }
    //Fetch all Contrat Models
   getAllModelContrats() {
        this.contratService.getAllModelContrats()
	   .subscribe(
                data => this.allModelContrats = data,
                errorCode =>  this.statusCode = errorCode);   
   }
    //Fetch all Proprietes
   getAllProprietes() {
        this.contratService.getAllProprieteTitre()
	   .subscribe(
                data => this.allProprietes = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all Clients
   getAllClientsNames() {
        this.contratService.getAllClientsNames()
	   .subscribe(
                data => this.allClients = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all documents
   getAllDocuments() {
        this.contratService.getAllDocuments()
	   .subscribe(
                data => this.allDocuments = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update contrat
   onContratFormSubmit() {
   this.clients=[];
	  this.processValidation = true;   
	  if (this.contratForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
          this.preProcessConfigurations();
		  let nomProprietaire= this.contratForm.get('proprietaire').value;
		  let nomClient= this.contratForm.get('client').value;
		  let dateContrat = this.contratForm.get('dateContrat').value;
		  let honoraire = this.contratForm.get('honoraire').value;
		let montantVente = this.contratForm.get('montantVente').value;
		let montantLocation = this.contratForm.get('montantLocation').value;
		let dateDebut = this.contratForm.get('dateDebut').value.trim();
		let periodeMontant = this.contratForm.get('periodeMontant').value;
		let dateFin = this.contratForm.get('dateFin').value.trim();
		let author = this.contratForm.get('author').value.trim();
		let dateNotification = this.contratForm.get('dateNotification').value;
		let notRenou = this.contratForm.get('notRenou').value.trim();
		let caution = this.contratForm.get('caution').value;
		let titrePropriete = this.contratForm.get('titrePropriete').value;
		let titreContrat = this.contratForm.get('titreContrat').value.trim();
		let titreModelContrat;
		let titreModelContratEnr;
		let descModelContrat;
		
			  titreModelContrat = this.contratForm.get('titreModelContrat').value;
		 
			  titreModelContratEnr = this.contratForm.get('titreModelContratEnr').value;
			  descModelContrat=this.contratForm.get('descModelContrat').value;
		 
	  if (this.contratIdToUpdate === null && this.textModelContrat=== null) {  
	    //Handle create contrat
		this.contratService.getClientByNom(nomProprietaire).subscribe(clt =>{
		this.clients[0]= clt;
		this.contratService.getClientByNom(nomClient).subscribe(client =>{
		this.clients[1]=client;
		this.contratService.getProprieteByTitre(titrePropriete).subscribe(propriete =>{
		this.contratService.getModelContratByTitre(titreModelContrat).subscribe(modcontrat =>{
			let contrat= new Contrat(null,dateContrat,honoraire,montantVente,montantLocation,dateDebut,periodeMontant,dateFin,dateNotification,notRenou,caution,propriete,modcontrat,this.idUser,titreContrat,this.clients);	  
			this.contratService.createContrat(contrat)
			.subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllContrats();
				  this.contratService.getContratByTitre(titreContrat).subscribe(contrat =>{
					this.documentContrat.contrat=contrat;
					this.documentContrat.author=this.idUser;
					this.contratService.createDocument(this.documentContrat)
					.subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllModelContrats();	
				this.getAllProprietes();
				this.getAllClientsNames();
			      this.backToCreateContrat();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
					
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);
		} else if(this.contratIdToUpdate === null && this.textModelContrat === 1) {
		  //create Model Contrat and Contrat
		  let modContrat= new ModelContrat(null,titreModelContratEnr,descModelContrat,this.idUser);
		  this.contratService.createModelContrat(modContrat).subscribe(successCode => {
		  this.statusCode = successCode;
		  this.contratService.getClientByNom(nomProprietaire).subscribe(proprietaire =>{
		  this.clients[0]=proprietaire;
			this.contratService.getClientByNom(nomClient).subscribe(client =>{
			this.clients[1]=client;
		  this.contratService.getProprieteByTitre(titrePropriete).subscribe(propriete =>{
		  this.contratService.getModelContratByTitre(titreModelContratEnr).subscribe(modContrat =>{
			let contrat= new Contrat(this.contratIdToUpdate, dateContrat,honoraire,montantVente,montantLocation,dateDebut,periodeMontant,dateFin,dateNotification,notRenou,caution,propriete,modContrat,this.idUser,titreContrat,this.clients);	  
			this.contratService.createContrat(contrat)
			.subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllContrats();
					this.getAllModelContrats();
					this.getAllProprietes();
					this.getAllClientsNames();
			      this.backToCreateContrat();
			},
			errorCode => this.statusCode = errorCode);},
		    errorCode =>  this.statusCode = errorCode);},
		  errorCode => this.statusCode = errorCode);},
		    errorCode =>  this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
		        errorCode => this.statusCode = errorCode);
		}
		else if(this.textModelContrat === 1){
		  // create new Model Contrat and update contrat
		  let modContrat= new ModelContrat(null,titreModelContratEnr,descModelContrat,this.idUser);
		  this.contratService.createModelContrat(modContrat).subscribe(successCode => {
		  this.statusCode = successCode;
		  this.contratService.getClientByNom(nomProprietaire).subscribe(clt =>{
			this.clients[0]=clt;
			this.contratService.getClientByNom(nomClient).subscribe(client =>{
			this.clients[1]=client;
		  this.contratService.getProprieteByTitre(titrePropriete).subscribe(propriete =>{
		  this.contratService.getModelContratByTitre(titreModelContratEnr).subscribe(modContrat =>{
			 let contrat= new Contrat(this.contratIdToUpdate, dateContrat,honoraire,montantVente,montantLocation,dateDebut,periodeMontant,dateFin,dateNotification,notRenou,caution,propriete,modContrat,this.idUser,titreContrat,this.clients);	  
	    this.contratService.updateContrat(contrat)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
				this.getAllModelContrats();
			      this.getAllContrats();
					this.getAllProprietes();
					this.getAllClientsNames();
			      this.backToCreateContrat();
			},
			errorCode => this.statusCode = errorCode);},
		  errorCode =>  this.statusCode = errorCode);},
		  errorCode => this.statusCode = errorCode);},
		  errorCode =>  this.statusCode = errorCode);},
		  errorCode =>  this.statusCode = errorCode);},
		  errorCode => this.statusCode = errorCode);
		}else {  
   	    //Handle update contrat only
		this.contratService.getClientByNom(nomProprietaire).subscribe(proprietaire =>{
		this.clients[0]=proprietaire;
		this.contratService.getClientByNom(nomClient).subscribe(client =>{
		this.clients[1]=client;
		this.contratService.getProprieteByTitre(titrePropriete).subscribe(propriete =>{
		this.contratService.getModelContratByTitre(titreModelContrat).subscribe(modContrat =>{
	    let contrat= new Contrat(this.contratIdToUpdate, dateContrat,honoraire,montantVente,montantLocation,dateDebut,periodeMontant,dateFin,dateNotification,notRenou,caution,propriete,modContrat,author,titreContrat,this.clients);	  
	    this.contratService.updateContrat(contrat)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
				this.getAllModelContrats();
			      this.getAllContrats();
					this.getAllProprietes();
					this.getAllClientsNames
			      this.backToCreateContrat();
			},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);		
	  }
   }
   //Load contrat by id to edit
   loadContratToEdit(idContrat: string) {
      this.preProcessConfigurations();
      this.contratService.getContratById(idContrat)
	      .subscribe(contrat => {
		            this.contratIdToUpdate = contrat.idContrat;   
		            this.contratForm.setValue({ proprietaire: contrat.clients[0].nomClient, client: contrat.clients[1].nomClient, dateContrat: contrat.dateContrat,honoraire: contrat.honoraire,montantVente: contrat.montantVente,montantLocation: contrat.montantLocation,dateDebut: contrat.dateDebut,periodeMontant: contrat.periodeMontant,dateFin: contrat.dateFin,dateNotification: contrat.dateNotification,notRenou: contrat.notRenou,caution: contrat.caution,titrePropriete: contrat.propriete.titrePropriete,titreModelContrat: contrat.modelContrat.titreModelContrat,author: contrat.author,titreContrat: contrat.titreContrat,titreModelContratEnr: null,descModelContrat: null});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete contrat
   deleteContrat(idContrat: string) {
      this.preProcessConfigurations();
      this.contratService.deleteContratById(idContrat)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
			  this.getAllModelContrats();
		      this.getAllContrats();
			  this.getAllClientsNames();
				this.getAllProprietes();
		      this.backToCreateContrat();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateContrat() {
          this.contratIdToUpdate = null;
		  this.textModelContrat=null;
          this.contratForm.reset();	  
	  this.processValidation = false;
   }
      //Create Model Contrat Button click
    buttonCreateModelContrat() {
          this.textModelContrat = 1;
   }
   //Create Propriete Button click
    buttonCreatePropriete() {
		this.router.navigate(['./propriete']);
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
	this.documentContrat= new Document(null,fileName,null,"ressources/"+fileName,null,null,null,null,null,null,null);
	}
} 