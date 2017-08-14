import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Payement } from './payement';
import { Contrat } from '../contrat/contrat';
import { Client } from '../client/client';
import { Document } from '../document';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class PayementService {
    //URLs for CRUD operations
    allPayementsUrl = "http://localhost:8080/user/all-payements";
	 allContratsTitreUrl = "http://localhost:8080/user/all-contrats-titre";
    payementUrl = "http://localhost:8080/user/payement";
	allClientsNamesUrl = "http://localhost:8080/user/all-clients-names";
	clientByNomUrl = "http://localhost:8080/user/clientbynom";
	allDocumentsUrl = "http://localhost:8080/user/all-documents";
    documentUrl = "http://localhost:8080/user/document";
	payementTitreUrl = "http://localhost:8080/user/payement-titre";
	contratTitreUrl = "http://localhost:8080/user/contrat-titre";
	userIdUrl="http://localhost:8080/user/userid";
	private headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });
	
    //Create constructor to get Http instance
    constructor(private http:Http,private authenticationService: AuthenticationService) { 
    }
    //Fetch all payements
    getAllPayements(): Observable<Payement[]> {
        return this.http.get(this.allPayementsUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	
	//fetch all Clients Name
	getAllClientsNames(): Observable<String[]> {
        return this.http.get(this.allClientsNamesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//fetch all Contrats titles
	getAllContratsTitre(): Observable<String[]> {
        return this.http.get(this.allContratsTitreUrl,{headers: this.headers})
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
	//Fetch Payement by titre
    getPayementByTitre(titrePayement: string): Observable<Payement> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titrePayement);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.payementTitreUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }
	//Fetch contrat by titre
    getContratByTitre(titreContrat: string): Observable<Contrat> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('title', titreContrat);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.contratTitreUrl, options)
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
    createDocument(documentDep: Document):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.documentUrl, documentDep, options)
               .map(success => success.status)
               .catch(this.handleError);
    }	
    //Create payement
    createPayement(payement: Payement):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.payementUrl, payement, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	 
    //Fetch payement by id
    getPayementById(idPayement: string): Observable<Payement> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idPayement);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.payementUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update payement
    updatePayement(payement: Payement):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.payementUrl, payement, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete payement	
    deletePayementById(idPayement: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idPayement);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.payementUrl, options)
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
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 