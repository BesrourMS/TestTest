import { Client } from '../client/client';
import { Contrat } from '../contrat/contrat';
export class Payement {
	constructor( public idPayement: string,  
	public titrePayement: string,
	public typePayement: string,
	public descPayement: string,
	public montant: number,
	public author: string,
	public contrat: Contrat,
	public client: Client){
		
	}
}