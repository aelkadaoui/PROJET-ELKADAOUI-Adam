export class Equipe {
    constructor(id: number, nom: string, pays: string) {
        this._id = id;
        this._nom = nom;
        this._pays = pays
    }

    public _pays: string;

    get pays(): string {
        return this._pays;
    }

    set pays(value: string) {
        this._pays = value;
    }

    private _nom: string;

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}
