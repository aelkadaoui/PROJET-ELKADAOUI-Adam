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

    public _marque: string;

    get marque(): string {
        return this._marque;
    }

    set marque(value: string) {
        this._marque = value;
    }

    public _equipe: string;

    get equipe(): string {
        return this._equipe;
    }

    set equipe(value: string) {
        this._equipe = value;
    }

    public _stock: number;

    get stock(): number {
        return this._stock;
    }

    set stock(value: number) {
        this._stock = value;
    }

    public _image: string;

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    public _prix: number;

    get prix(): number {
        return this._prix;
    }

    set prix(value: number) {
        this._prix = value;
    }

    public _saison: string;

    get saison(): string {
        return this._saison;
    }

    set saison(value: string) {
        this._saison = value;
    }

    public _type: string;

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    public _nom: string;

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    public _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}
