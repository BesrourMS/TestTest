import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { PayementService } from './payement.service';
import { Payement } from './payement';
import { Contrat } from '../contrat/contrat';
import { Client } from '../client/client';
import { Document } from '../document';

@Component({
   selector: 'app-payement',
   templateUrl: './payement.component.html',
   //styleUrls: ['./contrat.component.css']
})
export class PayementComponent implements OnInit { 
   //Component properties
   allPayements: Payement[];
   allContrats: String[];
   allClients: String[];
   idUser: string;
   allDocuments: Document[];
   documentPay:Document;
   client: Client;
   contrat: Contrat;
   statusCode: number;
   requestProcessing = false;
   payementIdToUpdate = null;
   processValidation = false;
   //Create form
   payementForm = new FormGroup({
		client: new FormControl(''),
		contrat: new FormControl(''),
		titrePayement:  new FormControl(''),
		typePayement:  new FormControl(''),
		descPayement:  new FormControl(''),
		author:  new FormControl(''),
		montant:  new FormControl('')
   });
   //Create constructor to get service instance
   constructor(private payementService: PayementService,private router: Router) {
   }
   //Create ngOnInit()
   ngOnInit(): void {
	   this.payementService.getIdUser().subscribe(id =>{this.idUser=id;
	   this.payementForm.setValue({ client: null, contrat: null, titrePayement: null,typePayement: null,descPayement: null,montant: null,author: this.idUser});
	   this.getAllPayements();
		   this.getAllContrats();
		   this.getAllClientsNames();
	   },errorCode => this.statusCode = errorCode);
	   
   }   
   //Fetch all payements
   getAllPayements() {
        this.payementService.getAllPayements()
	   .subscribe(
                data => this.allPayements = data,
                errorCode =>  this.statusCode = errorCode);   
   }
    
    //Fetch all Contrats
   getAllContrats() {
        this.payementService.getAllContratsTitre()
	   .subscribe(
                data => this.allContrats = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all Clients
   getAllClientsNames() {
        this.payementService.getAllClientsNames()
	   .subscribe(
                data => this.allClients = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all documents
   getAllDocuments() {
        this.payementService.getAllDocuments()
	   .subscribe(
                data => this.allDocuments = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update payement
   onPayementFormSubmit() {
	  this.processValidation = true;   
	  if (this.payementForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
          this.preProcessConfigurations();
		  let titrePayement= this.payementForm.get('titrePayement').value;
		  let typePayement=  this.payementForm.get('typePayement').value;
			let descPayement=  this.payementForm.get('descPayement').value;
			let author=  this.payementForm.get('author').value;
			let montant=  this.payementForm.get('montant').value;
			let nomClient=  this.payementForm.get('client').value;
			let titreContrat=  this.payementForm.get('contrat').value;
	  if (this.payementIdToUpdate === null) {  
	    //Handle create payement
		if(titreContrat===null){
					this.payementService.getClientByNom(nomClient).subscribe(clt =>{
		this.client= clt;
		let payement= new Payement(null,titrePayement,typePayement,descPayement,montant,this.idUser,null,this.client);	  
			this.payementService.createPayement(payement)
			.subscribe(successCode => {
		              this.statusCode = successCode;
				  this.payementService.getPayementByTitre(titrePayement).subscribe(payement =>{
					this.documentPay.payement=payement;
					this.documentPay.author=this.idUser;
					this.payementService.createDocument(this.documentPay)
					.subscribe(successCode => {
		              this.statusCode = successCode;
					  this.getAllPayements();
			      this.getAllContrats();
				this.getAllClientsNames();
			      this.backToCreatePayement();
			},
			errorCode => this.statusCode = errorCode);
					
			},
			errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);
		}else{
			this.payementService.getClientByNom(nomClient).subscribe(clt =>{
		this.client= clt;
		this.payementService.getContratByTitre(titreContrat).subscribe(contrat =>{
		this.contrat=contrat;
		let payement= new Payement(null,titrePayement,typePayement,descPayement,montant,this.idUser,this.contrat,this.client);	  
			this.payementService.createPayement(payement)
			.subscribe(successCode => {
		              this.statusCode = successCode;
				  this.payementService.getPayementByTitre(titrePayement).subscribe(payement =>{
					this.documentPay.payement=payement;
					this.documentPay.author=this.idUser;
					this.payementService.createDocument(this.documentPay)
					.subscribe(successCode => {
		              this.statusCode = successCode;
					  this.getAllPayements();
			      this.getAllContrats();
				this.getAllClientsNames();
			      this.backToCreatePayement();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
					
			},
			errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);
		}

		}else {  
   	    //Handle update payement
		this.payementService.getClientByNom(nomClient).subscribe(clt =>{
		this.client= clt;
		this.payementService.getContratByTitre(titreContrat).subscribe(contrat =>{
		this.contrat=contrat;
		let payement= new Payement(this.payementIdToUpdate,titrePayement,typePayement,descPayement,montant,this.idUser,this.contrat,this.client);	  
			this.payementService.createPayement(payement)
			.subscribe(successCode => {
		              this.statusCode = successCode;
				  this.payementService.getPayementByTitre(titrePayement).subscribe(payement =>{
					this.documentPay.payement=payement;
					this.documentPay.author=this.documentPay.payement.author;
					this.payementService.createDocument(this.documentPay)
					.subscribe(successCode => {
		              this.statusCode = successCode;
					  this.getAllPayements();
			      this.getAllContrats();
				this.getAllClientsNames();
			      this.backToCreatePayement();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
					
			},
			errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);},
		errorCode => this.statusCode = errorCode);
	  }
   }
   //Load payement by id to edit
   loadPayementToEdit(idPayement: string) {
      this.preProcessConfigurations();
      this.payementService.getPayementById(idPayement)
	      .subscribe(payement => {
		            this.payementIdToUpdate = payement.idPayement;   
		            this.payementForm.setValue({ client: payement.client.nomClient, contrat: payement.contrat.titreContrat, titrePayement: payement.titrePayement,typePayement: payement.typePayement,descPayement: payement.descPayement,montant: payement.montant,author: payement.author});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete payement
   deletePayement(idPayement: string) {
      this.preProcessConfigurations();
      this.payementService.deletePayementById(idPayement)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
			 this.getAllPayements();
			      this.getAllContrats();
				this.getAllClientsNames();
			      this.backToCreatePayement();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreatePayement() {
          this.payementIdToUpdate = null;
          this.payementForm.reset();	  
	  this.processValidation = false;
   }
    //Create Client Button click
    buttonCreateClient() {
		this.router.navigate(['./client']);
   }
    //Create Contrat Button click
    buttonCreateContrat() {
		this.router.navigate(['./contrat']);
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
	this.documentPay= new Document(null,fileName,null,"ressources/"+fileName,null,null,null,null,null,null,null);
	}
} 