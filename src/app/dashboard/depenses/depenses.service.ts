import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Depenses } from './depenses';
import { CatDepenses } from './catdepenses';
import { Client } from '../client/client';
import { Document } from '../document';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class DepensesService {
    //URLs for CRUD operations
    allDepensesUrl = "http://localhost:8080/user/all-depenses";
	 allCatDepensesUrl = "http://localhost:8080/user/all-catdepenses";
    depensesUrl = "http://localhost:8080/user/depenses";
	catDepensesUrl = "http://localhost:8080/user/catdepenses";
	allClientsNamesUrl = "http://localhost:8080/user/all-clients-names";
	clientByNomUrl = "http://localhost:8080/user/clientbynom";
	allDocumentsUrl = "http://localhost:8080/user/all-documents";
    documentUrl = "http://localhost:8080/user/document";
	depensesTitreUrl = "http://localhost:8080/user/depenses-titre";
	userIdUrl="http://localhost:8080/user/userid";
	private headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });
    //Create constructor to get Http instance
    constructor(private http:Http,private authenticationService: AuthenticationService) { 
    }
    //Fetch all depenses
    getAllDepenses(): Observable<Depenses[]> {
        return this.http.get(this.allDepensesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//fetch all Categorie Depenses
	getAllCatDepenses(): Observable<String[]> {
        return this.http.get(this.allCatDepensesUrl,{headers: this.headers})
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
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('nom', nomClient);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.clientByNomUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch Catdepenses by titre
    getCatDepensesByTitre(titreCatDepenses: string): Observable<CatDepenses> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titreCatDepenses);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.catDepensesUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch depenses by titre
    getDepensesByTitre(titreDepenses: string): Observable<Depenses> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titreDepenses);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.depensesTitreUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch all documents
    getAllDocuments(): Observable<Document[]> {
        return this.http.get(this.allDocumentsUrl)
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//Create document
    createDocument(documentDep: Document):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.documentUrl, documentDep, options)
               .map(success => success.status)
               .catch(this.handleError);
    }	
    //Create depenses
    createDepenses(depenses: Depenses):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.depensesUrl, depenses, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	 //Create Categorie depenses
    createCatDepenses(catDepenses: CatDepenses):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.catDepensesUrl, catDepenses, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch depenses by id
    getDepensesById(idDepenses: string): Observable<Depenses> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idDepenses);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.depensesUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update depenses
    updateDepenses(depenses: Depenses):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.depensesUrl, depenses, options)
               .map(success => success.status)
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
    //Delete depenses	
    deleteDepensesById(idDepenses: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idDepenses);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.depensesUrl, options)
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