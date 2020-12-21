import {Produit} from './produit';

export class PanierProduit extends Produit {
    quantite: number;

    constructor(id: number, nom: string, type:string,saison:string,image:string, prix: number,stock:number,marque:string,equipe:string) {
        super(id, nom, type, saison, image, prix, stock, marque, equipe);
        this.quantite = 1;
    }
}
