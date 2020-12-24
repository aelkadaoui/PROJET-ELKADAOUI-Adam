export class Equipe {
    constructor(id: number, nom: string, pays: string) {
        this._id = id;
        this._nom = nom;
        this._pays = pays
    }

    private _pays: string;

    get pays(): string {
        return this._pays;
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
