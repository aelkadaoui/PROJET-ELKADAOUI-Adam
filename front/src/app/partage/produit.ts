export class Produit {
    constructor(id: number, nom: string, type: string, saison: string, image: string, prix: number, stock: number, marque: string, equipe: string) {
        this._id = id;
        this._nom = nom;
        this._type = type;
        this._saison = saison;
        this._image = image;
        this._prix = prix;
        this._stock = stock;
        this._marque = marque;
        this._equipe = equipe;
    }

    private _marque: string;

    get marque(): string {
        return this._marque;
    }

    private _equipe: string;

    get equipe(): string {
        return this._equipe;
    }

    private _stock: number;

    get stock(): number {
        return this._stock;
    }

    private _image: string;

    get image(): string {
        return this._image;
    }

    private _prix: number;

    get prix(): number {
        return this._prix;
    }

    private _saison: string;

    get saison(): string {
        return this._saison;
    }

    private _type: string;

    get type(): string {
        return this._type;
    }

    private _nom: string;

    get nom(): string {
        return this._nom;
    }

    private _id: number;

    get id(): number {
        return this._id;
    }
}
