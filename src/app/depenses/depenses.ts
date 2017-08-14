import { CatDepenses } from './catdepenses';
import { Client } from '../client/client';
export class Depenses {
   constructor(public idDepenses: string,
    public typeDepenses: string,
	public valeur: number,
	public titreDep: string,
	public descriptionDep: string,
	public author: string,
	public catDepenses: CatDepenses,
	public clientDep: Client
) { 
   }
} 