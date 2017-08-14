import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Contrat } from './contrat';
import { ModelContrat } from './modelcontrat';
import { Propriete } from '../propriete/propriete';
import { Client } from '../client/client';
import { Document } from '../document';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class ContratService {
    //URLs for CRUD operations
    allContratsUrl = "http://localhost:8080/user/all-contrats";
	allModelContratUrl = "http://localhost:8080/user/all-modelcontrats";
    contratUrl = "http://localhost:8080/user/contrat";
	modelContratUrl = "http://localhost:8080/user/modelcontrat";
	proprieteTitreUrl = "http://localhost:8080/user/propriete-by-title";
	contratTitreUrl = "http://localhost:8080/user/contrat-titre";
	allProprieteTitreUrl = "http://localhost:8080/user/all-proprietes-titre";
	allClientsNamesUrl = "http://localhost:8080/user/all-clients-names";
	clientByNomUrl = "http://localhost:8080/user/clientbynom";
	allDocumentsUrl = "http://localhost:8080/user/all-documents";
    documentUrl = "http://localhost:8080/user/document";
	userIdUrl="http://localhost:8080/user/userid"; 
	
	private headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });
    //Create constructor to get Http instance
    constructor(private http:Http,private authenticationService: AuthenticationService) { 
    }
    //Fetch all contrats
    getAllContrats(): Observable<Contrat[]> {
        return this.http.get(this.allContratsUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//fetch all Contrat models
	getAllModelContrats(): Observable<String[]> {
        return this.http.get(this.allModelContratUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//fetch all Proprietes Title
	getAllProprieteTitre(): Observable<String[]> {
        return this.http.get(this.allProprieteTitreUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//fetch all Client Name
	getAllClientsNames(): Observable<String[]> {
        return this.http.get(this.allClientsNamesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
		//Fetch Client by name
    getClientByNom(nomClient: string): Observable<Client> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken()});
	let cpParams = new URLSearchParams();
	cpParams.set('nom', nomClient);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.clientByNomUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch all documents
    getAllDocuments(): Observable<Document[]> {
        return this.http.get(this.allDocumentsUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//Create document
    createDocument(documentArt: Document):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.documentUrl, documentArt, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch Model Contrat by titre
    getModelContratByTitre(titreModelContrat: string): Observable<ModelContrat> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titreModelContrat);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.modelContratUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch propriete by titre
    getProprieteByTitre(titrePropriete: string): Observable<Propriete> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titrePropriete);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.proprieteTitreUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
		//get id user
	getIdUser(): Observable<string> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('name', this.authenticationService.getUserName());			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.userIdUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch contrat by titre
    getContratByTitre(titreContrat: string): Observable<Contrat> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken()  });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titreContrat);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.contratTitreUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
    //Create contrat
    createContrat(contrat: Contrat):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken()  });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.contratUrl, contrat, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	 //Create Model Contrat
    createModelContrat(modelContrat: ModelContrat):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.modelContratUrl, modelContrat, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch contrat by id
    getContratById(idContrat: string): Observable<Contrat> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idContrat);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.contratUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update contrat
    updateContrat(contrat: Contrat):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.contratUrl, contrat, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete contrat	
    deleteContratById(idContrat: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idContrat);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.contratUrl, options)
	       .map(success => success.status)
	       .catch(this.handleError);
    }		
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 