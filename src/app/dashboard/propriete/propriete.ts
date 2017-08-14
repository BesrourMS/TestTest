import { Client } from '../client/client';
import { Taxonomie } from '../cattaxonomie/taxonomie';
export class Propriete {
   constructor(public idPropriete: string, 
    public titrePropriete: string,
	public descriptionProp: string,
	public referenceProp: string,
	public anneeConstProp: Date,
	public prix: number,
	public author: string,
	public chambres: number,
	public lits: number,
	public sallesBain: number,
	public garages: number,
	public surfaceProp: number,
	public dimLotissements: string,
	public surfaceLot: number,
	public lienVideo: string,
	public regLat: number,
	public regLong: number,
	public isDemande: string,
	public galerie: string,
	public planEtage: string,
	public client: Client,
	public taxonomies: Taxonomie[]) { 
   }
} 