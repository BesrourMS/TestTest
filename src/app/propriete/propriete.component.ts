import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { ProprieteService } from './propriete.service';

import { Propriete } from './propriete';
import { Taxonomie } from '../cattaxonomie/taxonomie';
import { CatTaxonomie } from '../cattaxonomie/cattaxonomie';
import { Client } from '../client/client';
import { Document } from '../document';


@Component({
   selector: 'app-propriete',
   templateUrl: './propriete.component.html',
   //styleUrls: ['./contrat.component.css']
})
export class ProprieteComponent implements OnInit { 
   //Component properties
   allProprietes: Propriete[];
   allClients: String[];
   url: any;
   allTaxonomies: Taxonomie[];
   allDocuments: Document[];
   documentProp: Document;
   idUser: string;
   galerieProp: Document[];
   // msgs: Message[];
   imageVedette: any;
   uploadedFiles: any[] = [];
   statusCode: number;
   requestProcessing = false;
   proprieteIdToUpdate = null;
   processValidation = false;
   //Create form
   proprieteForm = new FormGroup({
	    titrePropriete:  new FormControl('', Validators.required),
		descriptionProp: new FormControl(''),
		referenceProp: new FormControl(''),
		anneeConstProp: new FormControl(''),
		prix: new FormControl(''),
		author: new FormControl(''),
		chambres: new FormControl(''),
		lits: new FormControl(''),
		sallesBain: new FormControl(''),
		garages: new FormControl(''),
		surfaceProp: new FormControl(''),
		dimLotissements: new FormControl(''),
		surfaceLot: new FormControl(''),
		lienVideo: new FormControl(''),
		regLat: new FormControl(''),
		regLong: new FormControl(''),
		isDemande: new FormControl(''),
		// galerie: new FormControl(''),
		planEtage: new FormControl(''),
		nomClient: new FormControl(''),
		types: new FormControl(''),
		typeOffre: new FormControl(''),
		region: new FormControl(''),
		statusProp: new FormControl(''),
		material: new FormControl(''),
		equippementsProp: new FormControl('')
		
   });
   //Create constructor to get service instance
   constructor(private proprieteService: ProprieteService,private router: Router) {
   }
   //Create ngOnInit() and load proprietes
   ngOnInit(): void {
	   	   this.proprieteService.getIdUser().subscribe(id =>{this.idUser=id;
		this.proprieteForm.setValue({ titrePropriete: null,descriptionProp: null,referenceProp: null,anneeConstProp: null,prix: null,author: this.idUser,chambres: null,lits: null,sallesBain: null,garages: null,surfaceProp: null,dimLotissements: null,surfaceLot: null,lienVideo: null,regLat: null,regLong: null,isDemande: null,planEtage: null,nomClient: null,types: null,typeOffre: null,region: null,statusProp: null,material: null,equippementsProp: null});   
   	   this.getAllProprietes();
	   this.getAllClientsNames();
	   this.getAllTaxonomies();
	   this.galerieProp=[];
	   },errorCode => this.statusCode = errorCode);

	   
   }   
   //Fetch all proprietes
   getAllProprietes() {
        this.proprieteService.getAllProprietes()
	   .subscribe(
                data => this.allProprietes = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all documents
   getAllDocuments() {
        this.proprieteService.getAllDocuments()
	   .subscribe(
                data => this.allDocuments = data,
                errorCode =>  this.statusCode = errorCode);   
   }
    //Fetch all Clients Names
   getAllClientsNames() {
        this.proprieteService.getAllClientsNames()
	   .subscribe(
                data => this.allClients = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   
      //Fetch all catTaxonomies
   /* getAllCatTaxonomies() {
        this.proprieteService.getAllCatTaxonomies()
	   .subscribe(
                data => this.allCatTaxonomies = data,
                errorCode =>  this.statusCode = errorCode);   
   } */
   //Fetch all Taxonomies
   getAllTaxonomies() {
        this.proprieteService.getAllTaxonomies()
	   .subscribe(
                data => this.allTaxonomies = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update propriete
   onProprieteFormSubmit() {
	   this.allTaxonomies=[];
	  this.processValidation = true;   
	  if (this.proprieteForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
          this.preProcessConfigurations();
		  let titrePropriete = this.proprieteForm.get('titrePropriete').value.trim();
		  let descriptionProp = this.proprieteForm.get('descriptionProp').value;
		  let referenceProp = this.proprieteForm.get('referenceProp').value;
		  let anneeConstProp = this.proprieteForm.get('anneeConstProp').value;
		  let prix = this.proprieteForm.get('prix').value;
		  let author = this.proprieteForm.get('author').value;
		  let chambres = this.proprieteForm.get('chambres').value;
		  let lits = this.proprieteForm.get('lits').value;
		  let sallesBain = this.proprieteForm.get('sallesBain').value;
		  let garages = this.proprieteForm.get('garages').value;
		  let surfaceProp = this.proprieteForm.get('surfaceProp').value;
		  let dimLotissements = this.proprieteForm.get('dimLotissements').value;
		  let surfaceLot = this.proprieteForm.get('surfaceLot').value;
		  let lienVideo = this.proprieteForm.get('lienVideo').value;
		  let regLat = this.proprieteForm.get('regLat').value;
		  let regLong = this.proprieteForm.get('regLong').value;
		  let isDemande = this.proprieteForm.get('isDemande').value;
		  let planEtage = this.proprieteForm.get('planEtage').value;
		  let nomClient = this.proprieteForm.get('nomClient').value;
		  let types =this.proprieteForm.get('types').value;
		  let typeOffre =this.proprieteForm.get('typeOffre').value;
		  let region =this.proprieteForm.get('region').value;
		  let statusProp =this.proprieteForm.get('statusProp').value;
		  let material =this.proprieteForm.get('material').value;
		  let equippementsProp =this.proprieteForm.get('equippementsProp').value;

	  if (this.proprieteIdToUpdate === null) {  
	    //Handle create propriete
		this.proprieteService.getTaxonomieByTitre(types).subscribe(taxonomieType =>{
		this.allTaxonomies[0]=taxonomieType;
		this.proprieteService.getTaxonomieByTitre(typeOffre).subscribe(taxTypeOffre =>{
		this.allTaxonomies[1]=taxTypeOffre;
		this.proprieteService.getTaxonomieByTitre(region).subscribe(taxRegion =>{
		this.allTaxonomies[2]=taxRegion;
		this.proprieteService.getTaxonomieByTitre(statusProp).subscribe(taxStatus =>{
		this.allTaxonomies[3]=taxStatus;
		this.proprieteService.getTaxonomieByTitre(material).subscribe(taxMaterial =>{
		this.allTaxonomies[4]=taxMaterial;
		this.proprieteService.getTaxonomieByTitre(equippementsProp).subscribe(taxEquippements =>{
		this.allTaxonomies[5]=taxEquippements;
		this.proprieteService.getClientByNom(nomClient).subscribe(client =>{
	    let propriete= new Propriete(null,titrePropriete,descriptionProp,referenceProp,anneeConstProp,prix,this.idUser,chambres,lits,sallesBain,garages,surfaceProp,dimLotissements,surfaceLot,lienVideo,regLat,regLong,isDemande,null,planEtage,client,this.allTaxonomies);	  
	    this.proprieteService.createPropriete(propriete)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllProprietes();
				  this.getAllTaxonomies();
				this.getAllClientsNames();
			      this.proprieteService.getProprieteByTitle(titrePropriete).subscribe(propriete =>{
					this.documentProp.propriete=propriete;
					this.documentProp.author=this.idUser;
					for(let i=0;i<this.galerieProp.length;i++){
						this.galerieProp[i].propriete=propriete;
						this.galerieProp[i].author=this.idUser;
					}
					this.proprieteService.createDocument(this.documentProp)
					.subscribe(successCode => {
		              this.statusCode = successCode;
					  this.createGalerie(0);
						this.getAllProprietes();
						this.getAllClientsNames;
					this.getAllDocuments();
					this.getAllTaxonomies();
			      this.backToCreatePropriete();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
		        errorCode => this.statusCode = errorCode);},
				errorCode => this.statusCode = errorCode);
		
	  } else {  
   	    //Handle update propriete
		this.proprieteService.getTaxonomieByTitre(types).subscribe(taxonomie =>{
		this.allTaxonomies[0]=taxonomie;
		this.proprieteService.getTaxonomieByTitre(typeOffre).subscribe(taxonomie =>{
		this.allTaxonomies[1]=taxonomie;
		this.proprieteService.getTaxonomieByTitre(region).subscribe(taxonomie =>{
		this.allTaxonomies[2]=taxonomie;
		this.proprieteService.getTaxonomieByTitre(statusProp).subscribe(taxonomie =>{
		this.allTaxonomies[3]=taxonomie;
		this.proprieteService.getTaxonomieByTitre(material).subscribe(taxonomie =>{
		this.allTaxonomies[4]=taxonomie;
		this.proprieteService.getTaxonomieByTitre(equippementsProp).subscribe(taxonomie =>{
		this.allTaxonomies[5]=taxonomie;
		this.proprieteService.getClientByNom(nomClient).subscribe(client =>{
	    let propriete= new Propriete(this.proprieteIdToUpdate, titrePropriete,descriptionProp,referenceProp,anneeConstProp,prix,this.idUser,chambres,lits,sallesBain,garages,surfaceProp,dimLotissements,surfaceLot,lienVideo,regLat,regLong,isDemande,null,planEtage,client,this.allTaxonomies);	  
	    this.proprieteService.updatePropriete(propriete)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllProprietes();	
				  this.getAllClientsNames();
			      this.proprieteService.getProprieteByTitle(titrePropriete).subscribe(propriete =>{
					this.documentProp.propriete=propriete;
					for(let i=0;i<this.galerieProp.length;i++){
						this.galerieProp[i].propriete=propriete;
					}
					this.proprieteService.createDocument(this.documentProp)
					.subscribe(successCode => {
		              this.statusCode = successCode;
					  this.createGalerie(0);
					  this.galerieProp=[];
					this.getAllProprietes();
					this.getAllDocuments();
					this.backToCreatePropriete();
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);
			},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
			errorCode => this.statusCode = errorCode);},
		        errorCode => this.statusCode = errorCode);},
				errorCode => this.statusCode = errorCode);
	  }
   }
   //Load propriete by id to edit
   loadProprieteToEdit(idPropriete: string) {
      this.preProcessConfigurations();
      this.proprieteService.getProprieteById(idPropriete)
	      .subscribe(propriete => {
		            this.proprieteIdToUpdate = propriete.idPropriete;   
		            this.proprieteForm.setValue({ titrePropriete: propriete.titrePropriete,descriptionProp: propriete.descriptionProp,referenceProp: propriete.referenceProp,anneeConstProp: propriete.anneeConstProp,prix: propriete.prix,author: propriete.author,chambres: propriete.chambres,lits: propriete.lits,sallesBain: propriete.sallesBain,garages: propriete.garages,surfaceProp: propriete.surfaceProp,dimLotissements: propriete.dimLotissements,surfaceLot: propriete.surfaceLot,lienVideo: propriete.lienVideo,regLat: propriete.regLat,regLong: propriete.regLong,isDemande: propriete.isDemande,planEtage: propriete.planEtage,nomClient: propriete.client.nomClient,types: propriete.taxonomies[0].titreTaxonomie,typeOffre: propriete.taxonomies[1].titreTaxonomie,region: propriete.taxonomies[2].titreTaxonomie,statusProp: propriete.taxonomies[3].titreTaxonomie,material: propriete.taxonomies[4].titreTaxonomie,equippementsProp: propriete.taxonomies[5].titreTaxonomie});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete propriete
   deletePropriete(idPropriete: string) {
      this.preProcessConfigurations();
      this.proprieteService.deleteProprieteById(idPropriete)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllProprietes();	
			  this.getAllClientsNames();
		      this.backToCreatePropriete();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //upload image vedette
   /* onUploadImage(event) {
        for(let file of event.files) {
            this.imageVedette= file;
        }
		//let imageV= new Document(null,null,null,this.imageVedette.url,null,null,null,null,null)
        /* this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''}); 
    } */
   //upload galerie
   /* onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        /* this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''}); 
    } */
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreatePropriete() {
          this.proprieteIdToUpdate = null;
          this.proprieteForm.reset();	  
	  this.processValidation = false;
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
	fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
	let fileName = file.name;
	var reader = new FileReader();

        reader.onload = (e:any) => {
			this.url= e.target.result;
        };

        reader.readAsDataURL(fileInput.target.files[0]);

	this.documentProp= new Document(null,fileName,null,"ressources/"+fileName,null,null,null,null,null,null,null);
	}
	fileGalerie(fileInput: any){
    for (let file of fileInput.target.files){
		let fileName = file.name;
		let documentP= new Document(null,fileName,null,"ressources/"+fileName,null,null,null,null,null,null,null);
		this.galerieProp.push(documentP);
	}
}
	createDoc():void{
		this.createGalerie(0);
		/* for(let doc of this.galerieProp){
			this.proprieteService.createDocument(doc)
					.subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllProprietes();
					this.getAllDocuments();
			      this.backToCreatePropriete();
			},
			errorCode => this.statusCode = errorCode);
		} */
	}
	createGalerie(compteur:number): void{
		if(compteur!= this.galerieProp.length){
			this.proprieteService.createDocument(this.galerieProp[compteur])
					.subscribe(successCode => {
		              this.statusCode = successCode;
					  this.createGalerie(compteur+1);},
			errorCode => this.statusCode = errorCode);
		}
		else{
			this.galerieProp=[];
		}
	}
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }
} 