import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Propriete } from './propriete';
import { Client } from '../client/client';
import { Taxonomie } from '../cattaxonomie/taxonomie';
import { Document } from '../document';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class ProprieteService {
    //URLs for CRUD operations
    allProprietesUrl = "http://localhost:8080/user/all-proprietes";
	allTaxonomiesUrl = "http://localhost:8080/user/all-taxonomies";
	allClientsNamesUrl = "http://localhost:8080/user/all-clients-names";
    proprieteUrl = "http://localhost:8080/user/propriete";
	clientByNomUrl = "http://localhost:8080/user/clientbynom";
	taxonomieByTitreUrl="http://localhost:8080/user/taxonomie-by-title";
	taxonomieUrl = "http://localhost:8080/user/taxonomie";
	allDocumentsUrl= "http://localhost:8080/user/all-documents";
	documentUrl = "http://localhost:8080/user/document";
	galerieUrl = "http://localhost:8080/user/galerie";
	proprieteByTitleUrl = "http://localhost:8080/user/propriete-by-title";
	userIdUrl="http://localhost:8080/user/userid";
	private headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });
    //Create constructor to get Http instance
    constructor(private http:Http,private authenticationService: AuthenticationService) { 
    }
    //Fetch all proprietes
    getAllProprietes(): Observable<Propriete[]> {
        return this.http.get(this.allProprietesUrl,{headers: this.headers})
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
	//Fetch all documents
    getAllDocuments(): Observable<Document[]> {
        return this.http.get(this.allDocumentsUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//Create Document
    createDocument(documentF: Document):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.documentUrl, documentF, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Delete document	
    deleteDocumentById(idDocument: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idDocument);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.documentUrl, options)
	       .map(success => success.status)
	       .catch(this.handleError);
    }		
	//Fetch all Taxonomies
    getAllTaxonomies(): Observable<Taxonomie[]> {
        return this.http.get(this.allTaxonomiesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//fetch all Client Name
	getAllClientsNames(): Observable<String[]> {
        return this.http.get(this.allClientsNamesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//Fetch Taxonomie by titre
    getTaxonomieByTitre(titreTaxonomie: string): Observable<Taxonomie> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titreTaxonomie);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.taxonomieByTitreUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch Client by name
    getClientByNom(nomClient: string): Observable<Client> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('nom', nomClient);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.clientByNomUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
    //Create propriete
    createPropriete(propriete: Propriete):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.proprieteUrl, propriete, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch propriete by id
    getProprieteById(idPropriete: string): Observable<Propriete> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idPropriete);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.proprieteUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
	//Fetch Propriete by title
    getProprieteByTitle(title: string): Observable<Propriete> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', title);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.proprieteByTitleUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
    //Update propriete
    updatePropriete(propriete: Propriete):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.proprieteUrl, propriete, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete propriete	
    deleteProprieteById(idPropriete: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idPropriete);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.proprieteUrl, options)
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