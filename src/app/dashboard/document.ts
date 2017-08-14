import { Propriete } from './propriete/propriete';
import { Client } from './client/client';
import { Depenses } from './depenses/depenses';
import { Contrat } from './contrat/contrat';
import { Payement } from './payement/payement';
export class Document {
	constructor( public idDocument: string,  
	public titreDoc: string,
	public typeDoc: string,
	public cheminDoc: string,
	public descDoc: string,
	public author: string,
	public propriete: Propriete,
	public depenses: Depenses,
	public contrat: Contrat,
	public client: Client,
	public payement: Payement){
		
	}
}