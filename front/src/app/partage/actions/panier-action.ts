import { Produit } from '../produit';

export class AjouterProduitPanier {
    static readonly type = '[PanierProduit] Ajouter';
    constructor(public payload: Produit) {}
}

export class AjouterUneQuantite {
    static readonly type = '[PanierProduit] AjouterUneQuantite';
    constructor(public payload: Produit) {}
}

export class SupprimerUneQuantite {
    static readonly type = '[PanierProduit] SupprimerUneQuantite';
    constructor(public payload: Produit) {}
}

export class SupprimerProduitPanier {
    static readonly type = '[PanierProduit] Supprimer';
    constructor(public payload: Produit) {}
}

export class ViderPanier {
    static readonly type = '[PanierProduit] Vider';
    constructor() {}
}
