import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CatTaxonomieService } from './cattaxonomie.service';
import { CatTaxonomie } from './cattaxonomie';
import { Taxonomie } from './taxonomie';


@Component({
   selector: 'app-cattaxonomie',
   templateUrl: './cattaxonomie.component.html',
   //styleUrls: ['./contrat.component.css']
})
export class CatTaxonomieComponent implements OnInit { 
   //Component catTaxonomie
   allCatTaxonomies: CatTaxonomie[];
   allTaxonomies: Taxonomie[];
   taxByCatTax: Taxonomie[];
   statusCode: number;
   idUser: string;
   requestProcessing = false;
   catTaxonomieToUpdate = null;
   catTaxonomieIdToUpdate = null;
   taxonomieIdToUpdate = null;
   
   processValidation = false;
   //Create form
   catTaxonomieForm = new FormGroup({
	    titreCatTaxonomie:  new FormControl(''),
		descCatTaxonomie: new FormControl(''),
		titreTaxonomie:  new FormControl(''),
		descTaxonomie: new FormControl(''),
		author: new FormControl('')
   });
   //Create constructor to get service instance
   constructor(private catTaxonomieService: CatTaxonomieService,private router: Router) {
   }
   //Create ngOnInit() and load catTaxonomies
   ngOnInit(): void {
	   this.catTaxonomieService.getIdUser().subscribe(id =>{this.idUser=id;
	   this.getAllCatTaxonomies();
	   this.getAllTaxonomies();
	   },errorCode => this.statusCode = errorCode);
	   this.getAllCatTaxonomies();
	   this.getAllTaxonomies();


   }   
   //Fetch all catTaxonomies
   getAllCatTaxonomies() {
        this.catTaxonomieService.getAllCatTaxonomies()
	   .subscribe(
                data => this.allCatTaxonomies = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Fetch all Taxonomies
   getAllTaxonomies() {
        this.catTaxonomieService.getAllTaxonomies()
	   .subscribe(
                data => this.allTaxonomies = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   
   //fetch all Taxonomies of CatTaxonomie
/*    getAllTaxonomiesByIdCatTaxonomie(idCatTaxonomie: string): boolean{
			this.catTaxonomieService.getAllTaxonomiesByIdCatTaxonomie(idCatTaxonomie)
	   .subscribe(
                data => this.allTaxonomies = data,
                errorCode =>  this.statusCode = errorCode); 
        
		if(this.allTaxonomies === null) return false;
		else return true;
		
   } */
   /*  //Fetch all Clients Names
   getAllClientsNames() {
        this.proprieteService.getAllClientsNames()
	   .subscribe(
                data => this.allClients = data,
                errorCode =>  this.statusCode = errorCode);   
   } */
   //Handle create and update catTaxonomie
   onCatTaxonomieFormSubmit() {
	  this.processValidation = true;   
	  if (this.catTaxonomieForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create catTaxonomie or taxonomie
          this.preProcessConfigurations();
		  let titreCatTaxonomie;
		  let descCatTaxonomie;
		  let titreTaxonomie;
		  let descTaxonomie;
		  if(this.catTaxonomieToUpdate=== null){
			 titreCatTaxonomie = this.catTaxonomieForm.get('titreCatTaxonomie').value;
			 descCatTaxonomie = this.catTaxonomieForm.get('descCatTaxonomie').value;
		  }else {
			 titreTaxonomie = this.catTaxonomieForm.get('titreTaxonomie').value;
				descTaxonomie = this.catTaxonomieForm.get('descTaxonomie').value;
		  }
		  let author = this.catTaxonomieForm.get('author').value;
		
	  if (this.catTaxonomieToUpdate === null) {  
		if(this.catTaxonomieIdToUpdate===null){
			//Handle create and update catTaxonomie
	    let catTaxonomie= new CatTaxonomie(null,titreCatTaxonomie,descCatTaxonomie,this.idUser);	  
	    this.catTaxonomieService.createCatTaxonomie(catTaxonomie)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      this.backToCreateCatTaxonomie();
				  this.getAllCatTaxonomies();	
				  
				  this.getAllTaxonomies();
			},
				errorCode => this.statusCode = errorCode);
		} else {
			//Handle update catTaxonomie
	    let catTaxonomie= new CatTaxonomie(this.catTaxonomieIdToUpdate, titreCatTaxonomie,descCatTaxonomie,this.idUser);	  
	    this.catTaxonomieService.updateCatTaxonomie(catTaxonomie)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			       this.backToCreateCatTaxonomie();
				  this.getAllCatTaxonomies();	

				  this.getAllTaxonomies();
			},
			errorCode => this.statusCode = errorCode);
		}
	    
	  } else {
			if(this.taxonomieIdToUpdate=== null){
				//Handle create and update taxonomie
			let taxonomie= new Taxonomie(null, titreTaxonomie,descTaxonomie,this.idUser,this.catTaxonomieToUpdate);	  
			this.catTaxonomieService.createTaxonomie(taxonomie)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
				this.backToCreateTaxonomie();
			    this.getAllCatTaxonomies();
				this.getAllTaxonomies();
			},
			errorCode => this.statusCode = errorCode);
			} else {
							//Handle update catTaxonomie
	    let taxonomie= new Taxonomie(this.taxonomieIdToUpdate, titreTaxonomie,descTaxonomie,this.idUser,this.catTaxonomieToUpdate);	  
	    this.catTaxonomieService.updateTaxonomie(taxonomie)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			       this.backToCreateTaxonomie();
				  this.getAllCatTaxonomies();	
				  this.getAllTaxonomies();

			},
			errorCode => this.statusCode = errorCode);
			}
   	    
	  }
   }
   /* getAllTaxonomiesByCat(){
					
					if(this.catTaxonomieToUpdate != null){
						for(var i=0;i<this.allTaxonomies.length;i++)
					{
						if(this.allTaxonomies[i].catTaxonomie.titreCatTaxonomie===this.catTaxonomieToUpdate.titreCatTaxonomie){
							this.taxByCatTax[i]=this.allTaxonomies[i];
						}
					}
/* 						this.catTaxonomieService.getAllTaxonomiesByIdCatTaxonomie(this.catTaxonomieToUpdate.idCatTaxonomie)
						.subscribe(
						data => this.taxByCatTax = data,
						errorCode =>  this.statusCode = errorCode);    */
					
   //Load catTaxonomie to edit
   loadCatTaxonomieToEdit(catTaxonomie: CatTaxonomie) {
		            this.catTaxonomieToUpdate = catTaxonomie; 
						this.processValidation = true;
			    this.requestProcessing = false; 
   }
   //Load catTaxonomie by id to edit
   loadCatTaxonomieToUpdate(idCatTaxonomie: string) {
      this.preProcessConfigurations();
      this.catTaxonomieService.getCatTaxonomieById(idCatTaxonomie)
	      .subscribe(catTaxonomie => {
		            this.catTaxonomieIdToUpdate = catTaxonomie.idCatTaxonomie;   
		            this.catTaxonomieForm.setValue({ titreCatTaxonomie: catTaxonomie.titreCatTaxonomie,descCatTaxonomie: catTaxonomie.descCatTaxonomie,author: catTaxonomie.author,titreTaxonomie:null,descTaxonomie: null});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Load Taxonomie by id to edit
   loadTaxonomieToUpdate(idTaxonomie: string) {
      this.preProcessConfigurations();
      this.catTaxonomieService.getTaxonomieById(idTaxonomie)
	      .subscribe(taxonomie => {
		            this.taxonomieIdToUpdate = taxonomie.idTaxonomie;   
		            this.catTaxonomieForm.setValue({ titreTaxonomie: taxonomie.titreTaxonomie,descTaxonomie: taxonomie.descTaxonomie,author: taxonomie.author,titreCatTaxonomie:null,descCatTaxonomie: null});
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }
   //Delete CatTaxonomie
   deleteCatTaxonomie(idCatTaxonomie: string) {
      this.preProcessConfigurations();
      this.catTaxonomieService.deleteCatTaxonomieById(idCatTaxonomie)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllCatTaxonomies();	
			  this.getAllTaxonomies();
		      this.backToCreateCatTaxonomie();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Delete Taxonomie
   deleteTaxonomie(idTaxonomie: string) {
      this.preProcessConfigurations();
      this.catTaxonomieService.deleteTaxonomieById(idTaxonomie)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllCatTaxonomies();	
			  this.getAllTaxonomies();
		      this.backToCreateTaxonomie();
		   },
		   errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
          this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateCatTaxonomie() {
		this.catTaxonomieIdToUpdate = null;
          this.catTaxonomieToUpdate = null;
          this.catTaxonomieForm.reset();	  
	  this.processValidation = false;
   }
      backToCreateTaxonomie() {
		this.taxonomieIdToUpdate = null;
          this.catTaxonomieForm.reset();	  
	  this.processValidation = false;
   }
   // Propriete  click
    pagePropriete() {
		this.router.navigate(['./propriete']);
   }
   //Client click
    pageClient() {
		this.router.navigate(['./client']);
   }
   //Payement click
    pagePayement() {
		this.router.navigate(['./payement']);
   }
   //Contrat click
    pageContrat() {
		this.router.navigate(['./contrat']);
   }
   //Depenses click
    pageDepenses() {
		this.router.navigate(['./depenses']);
   }
} 