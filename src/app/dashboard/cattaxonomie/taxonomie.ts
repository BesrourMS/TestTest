import { CatTaxonomie } from './cattaxonomie';
export class Taxonomie {
	constructor( public idTaxonomie: number,  
        public titreTaxonomie: string,
	public descTaxonomie: string,
	public author: string,
	public catTaxonomie: CatTaxonomie){
		
	}
}