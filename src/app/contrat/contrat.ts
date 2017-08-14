import { ModelContrat } from './modelcontrat';
import { Propriete } from '../propriete/propriete';
import { Client } from '../client/client';

export class Contrat {
   constructor(public idContrat: string, public dateContrat: Date,public honoraire: number,public montantVente: number,public montantLocation: number,public dateDebut: Date,public periodeMontant: number,public dateFin: Date,public dateNotification: Date,public notRenou: Date,public caution: number,public propriete: Propriete,public modelContrat: ModelContrat,public author: string,public titreContrat: string,public clients: Client[]) { 
   }
} 