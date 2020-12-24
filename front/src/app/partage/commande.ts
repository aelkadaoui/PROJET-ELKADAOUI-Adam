import {Ligne} from "./ligne";

export class Commande {
    private _lignesCommandes: Ligne[];

    constructor(id: number, codeCommande: string, idClient: number, dateCommande: Object, total: number, lignes: Ligne[], quantite: number) {
        this._idCommande = id;
        this._codeCommande = codeCommande;
        this._dateCommande = dateCommande;
        this._totalCommande = total;
        this._lignesCommandes = lignes;
        this._quantiteCommande = quantite;
        this._idClient = idClient;
    }

    get lignesCommande(): Ligne[] {
        return this._lignesCommandes;
    }

    private _codeCommande: string;

    get codeCommande(): string {
        return this._codeCommande;
    }

    private _dateCommande: Object;

    get dateCommande(): Object {
        return this._dateCommande;
    }

    private _totalCommande: number;

    get totalCommande(): number {
        return this._totalCommande;
    }

    private _quantiteCommande: number;

    get quantiteCommande(): number {
        return this._quantiteCommande;
    }

    private _idCommande: number;

    get idCommande(): number {
        return this._idCommande;
    }

    private _idClient: number;

    get idClient(): number {
        return this._idClient;
    }
}
