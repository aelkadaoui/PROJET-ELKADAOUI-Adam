export class Client {

    public idClient: number;
    public civilite: string;
    public nom: string;
    public prenom: string;
    public adresse: string;
    public cp: string;
    public ville: string;
    public pays: string;
    public tel: string;
    public mail: string;
    public login: string;
    public passwd: string;

    constructor() {
    }

    public client(civilite: string, nom: string, prenom: string, adresse: string, cp: string, ville: string,
                  pays: string, tel: string, mail: string, login: string, passwd: string): void {
        this.civilite = civilite;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.cp = cp;
        this.ville = ville;
        this.pays = pays;
        this.tel = tel;
        this.mail = mail;
        this.login = login;
        this.passwd = passwd;
    }

    public resetClient(): void {
        this.init();
    }

    private init(): void {
        this.idClient = -1;
        this.civilite = '';
        this.nom = '';
        this.prenom = '';
        this.adresse = '';
        this.cp = '';
        this.ville = '';
        this.pays = '';
        this.tel = '';
        this.mail = '';
        this.login = '';
        this.passwd = '';
    }

}
