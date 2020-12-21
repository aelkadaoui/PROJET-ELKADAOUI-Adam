export class InscriptionConnexion {
    static readonly type = '[Client] Ajout Connexion';

    constructor(public payload: string) {
    }
}

export class InscriptionJWT {
    static readonly type = '[Client] Ajout JWT';

    constructor(public payload: string) {
    }
}



