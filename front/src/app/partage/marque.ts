export class Marque {
    constructor(id: number, nom: string) {
        this._id = id;
        this._nom = nom;
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
