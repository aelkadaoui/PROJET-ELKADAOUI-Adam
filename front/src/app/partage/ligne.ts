import {Produit} from "./produit";

export class Ligne {

    constructor(id: number, total: number, quantite: number, maillot: Produit) {
        this._id = id;
        this._total = total;
        this._maillot = maillot;
        this._quantite = quantite;
    }

    private _id: number;

    get id(): number {
        return this._id;
    }

    private _total: number;

    get total(): number {
        return this._total;
    }

    private _maillot: Produit;

    get maillot(): Produit {
        return this._maillot;
    }

    private _quantite: number;

    get quantite(): number {
        return this._quantite;
    }
}
