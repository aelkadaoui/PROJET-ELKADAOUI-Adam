export class Marque {
    constructor(id: number, nom: string) {
        this._id = id;
        this._nom = nom;
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
