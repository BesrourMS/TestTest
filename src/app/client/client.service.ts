import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Client } from './client';
import { Document } from '../document';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class ClientService {
    //URLs for CRUD operations
    allClientsUrl = "http://localhost:8080/user/all-clients";
    clientUrl = "http://localhost:8080/user/client";
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
    //Fetch all clients
    getAllClients(): Observable<Client[]> {
        return this.http.get(this.allClientsUrl,{headers: this.headers})
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
    //Create client
    createClient(client: Client):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.clientUrl, client, options)
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
    //Fetch client by id
    getClientById(idClient: string): Observable<Client> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idClient);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.clientUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update client
    updateClient(client: Client):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.clientUrl, client, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete client	
    deleteClientById(idClient: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idClient);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.clientUrl, options)
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