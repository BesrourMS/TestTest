import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClientService } from './client.service';
import { Client } from './client';
import { Document } from '../document';
//import { TranslateService } from '../translate';



@Component({
   selector: 'app-client',
   templateUrl: './client.component.html',
   //styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit { 
   //Component properties
   allClients: Client[];
   allDocuments: Document[];
   documentClt:Document;
   statusCode: number;
   idUser: string;
   requestProcessing = false;
   clientIdToUpdate = null;
   processValidation = false;
   //Create form
   clientForm = new FormGroup({
       nomClient: new FormControl('', Validators.required),
       prenomClient: new FormControl('', Validators.required),
	   mailClient: new FormControl('', Validators.required),
	   telClient: new FormControl('', Validators.required),
		dateNaissance: new FormControl('', Validators.required),
		author: new FormControl('', Validators.required),
		cinClient: new FormControl('', Validators.required),
		dateCINClient: new FormControl('', Validators.required),
	    typeClient: new FormControl('', Validators.required)

   });
   //Create constructor to get service instance
   constructor(private clientService: ClientService) {
   }
   //Create ngOnInit() and load clients
   ngOnInit(): void {
	   this.clientService.getIdUser().subscribe(id =>{this.idUser=id;
	   this.getAllClients();
	   },errorCode => this.statusCode = errorCode);
	  // this.clientForm.setValue({ nomClient: null, prenomClient: null, mailClient: null, telClient: null, dateNaissance: null,author: client.author, cinClient: client.cinClient , dateCINClient: client.dateCINClient, typeClient: client.typeClient});
		
   }   
   //Fetch all clients
   getAllClients() {
        this.clientService.getAllClients()
	   .subscribe(
                data => this.allClients = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all documents
   getAllDocuments() {
        this.clientService.getAllDocuments()
	   .subscribe(
                data => this.allDocuments = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update client
   onClientFormSubmit() {
	  this.processValidation = true;   
	  if (this.clientForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
          this.preProcessConfigurations();
		  let typeClient = this.clientForm.get('typeClient').value.trim();
		let nomClient = this.clientForm.get('nomClient').value.trim();
		let prenomClient = this.clientForm.get('prenomClient').value.trim();
		let mailClient = this.clientForm.get('mailClient').value.trim();
		let telClient = this.clientForm.get('telClient').value;
		let dateNaissance = this.clientForm.get('dateNaissance').value.trim();
		let author = this.clientForm.get('author').value.trim();
		let cinClient = this.clientForm.get('cinClient').value;
		let dateCINClient = this.clientForm.get('dateCINClient').value.trim();
		
	  if (this.clientIdToUpdate === null) {  
	    //Handle create client
	    let client= new Client(null, nomClient, prenomClient,mailClient,telClient,dateNaissance,this.idUser,dateCINClient,cinClient,typeClient);	  
	    this.clientService.createClient(client)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllClients();	
				  this.clientService.getClientByNom(nomClient).subscribe(client =>{
					this.documentClt.client=client;
					this.documentClt.author=this.idUser;
					this.clientService.createDocument(this.documentClt)
					.subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllClients();
					this.getAllDocuments();
			      this.backToCreateClient();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
			},
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update client
	    let client= new Client(this.clientIdToUpdate, nomClient, prenomClient,mailClient, telClient,dateNaissance,author,dateCINClient, cinClient,typeClient);	  
	    this.clientService.updateClient(client)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllClients();	
			      this.backToCreateClient();
			},
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load client by id to edit
   loadClientToEdit(idClient: string) {
      this.preProcessConfigurations();
      this.clientService.getClientById(idClient)
	      .subscribe(client => {
		            this.clientIdToUpdate = client.idClient;   
		            this.clientForm.patchValue({ nomClient: client.nomClient, prenomClient: client.prenomClient, mailClient: client.mailClient, telClient: client.telClient, dateNaissance: client.dateNaissance,author: client.author, cinClient: client.cinClient , dateCINClient: client.dateCINClient, typeClient: client.typeClient});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete client
   deleteClient(idClient: string) {
      this.preProcessConfigurations();
      this.clientService.deleteClientById(idClient)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllClients();	
		      this.backToCreateClient();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //upload file
   uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:8080/user/upload'
    
  };
  sizeLimit = 2000000;
 
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
	this.documentClt= new Document(null,fileName,null,"ressources/"+fileName,null,null,null,null,null,null,null);
}
   //Go back from update to create
   backToCreateClient() {
          this.clientIdToUpdate = null;
          this.clientForm.reset();	  
	  this.processValidation = false;
   }
} 