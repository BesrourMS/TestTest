import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { CatTaxonomie } from './cattaxonomie';
import { Taxonomie } from './taxonomie';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class CatTaxonomieService {
    //URLs for CRUD operations
    allCatTaxonomiesUrl = "http://37.59.100.232:8080/user/all-cattaxonomies";
	allTaxonomiesUrl = "http://37.59.100.232:8080/user/all-taxonomies";
    catTaxonomieUrl = "http://37.59.100.232:8080/user/cattaxonomie";
	taxonomieUrl = "http://37.59.100.232:8080/user/taxonomie";
	allTaxonomiesByIdCatTaxonomieUrl= "http://37.59.100.232:8080/user/all-taxonomies-by-cattaxonomie"
	taxonomieByTitreUrl="http://37.59.100.232:8080/user/taxonomie-by-title";
	userIdUrl="http://37.59.100.232:8080/user/userid"; 
		
	private headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + this.authenticationService.getToken()
     });
    //Create constructor to get Http instance
    constructor(private http:Http,private authenticationService: AuthenticationService) { 
    }
    //Fetch all catTaxonomies
    getAllCatTaxonomies(): Observable<CatTaxonomie[]> {
        return this.http.get(this.allCatTaxonomiesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//Fetch all Taxonomies
    getAllTaxonomies(): Observable<Taxonomie[]> {
        return this.http.get(this.allTaxonomiesUrl,{headers: this.headers})
	       .map(this.extractData)
	       .catch(this.handleError);

    }
	//Fetch all Taxonomie of known CatTaxonomie
	    getAllTaxonomiesByIdCatTaxonomie(idCatTaxonomie: string): Observable<Taxonomie[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
		let cpParams = new URLSearchParams();
		cpParams.set('id', idCatTaxonomie);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.allTaxonomiesByIdCatTaxonomieUrl, options)
		.map(this.extractData)
		.catch(this.handleError);

    }
	//fetch all Client Name
	/* getAllClientsNames(): Observable<String[]> {
        return this.http.get(this.allClientsNamesUrl)
	       .map(this.extractData)
	       .catch(this.handleError);

    } */
	//Fetch Client by name
/*     getClientByNom(nomClient: string): Observable<Client> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let cpParams = new URLSearchParams();
	cpParams.set('nom', nomClient);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.clientByNomUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    } */
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
    //Create catTaxonomie
    createCatTaxonomie(catTaxonomie: CatTaxonomie):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.catTaxonomieUrl, catTaxonomie, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	 //Create taxonomie
    createTaxonomie(taxonomie: Taxonomie):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.taxonomieUrl, taxonomie, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch catTaxonomie by id
    getCatTaxonomieById(idCatTaxonomie: string): Observable<CatTaxonomie> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idCatTaxonomie);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.catTaxonomieUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
	//Fetch Taxonomie by id
    getTaxonomieById(idTaxonomie: string): Observable<Taxonomie> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idTaxonomie);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.taxonomieUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update catTaxonomie
    updateCatTaxonomie(catTaxonomie: CatTaxonomie):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.catTaxonomieUrl, catTaxonomie, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Update Taxonomie
    updateTaxonomie(taxonomie: Taxonomie):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.taxonomieUrl, taxonomie, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete catTaxonomie	
    deleteCatTaxonomieById(idCatTaxonomie: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idCatTaxonomie);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.catTaxonomieUrl, options)
	       .map(success => success.status)
	       .catch(this.handleError);
    }
	//Delete catTaxonomie	
    deleteTaxonomieById(idTaxonomie: string): Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.getToken() });
	let cpParams = new URLSearchParams();
	cpParams.set('id', idTaxonomie);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.delete(this.taxonomieUrl, options)
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