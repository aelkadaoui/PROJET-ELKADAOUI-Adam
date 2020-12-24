import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Client} from "../../partage/client"
import {Observable} from "rxjs";
import {Commande} from "../../partage/commande";

@Injectable({
    providedIn: 'root'
})
export class CompteService {
    constructor(private http: HttpClient) {
    }

    connexion(login: string, password: string): Observable<{ success: boolean, login: string, id: number }> {
        let body = new URLSearchParams();
        body.set('login', login);
        body.set('password', password);

        return this.http.post<{ success: boolean, login: string, id: number }>(
            environment.backendAPI + 'users/login',
            body.toString(),
            {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
            }
        );
    }

    inscriptionClient(client: Client): Observable<{ success: boolean, login: string, id: number }> {
        let body = new URLSearchParams();
        body.set('client', JSON.stringify(client));
        return this.http.post<{ success: boolean, login: string, id: number }>(
            environment.backendAPI + 'users/register',
            body.toString(),
            {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
            }
        );
    }

    getUser(login: string): Observable<Client> {
        return this.http.get<Client>(environment.backendAPI + 'users/account/' + login);
    }


    getCommandes(idClient: number): Observable<Commande[]> {
        return this.http.get<Commande[]>(environment.backendAPI + 'commandes/users/' + idClient);
    }

    getCommande(codeCommande: string): Observable<Commande> {
        return this.http.get<Commande>(environment.backendAPI + 'commandes/' + codeCommande);
    }

    nouvelleCommande(produits: any[], idClient: number, total: number): Observable<{ success: boolean; codeCommande: number }> {
        let body = new URLSearchParams();
        body.set('lignesCommande', JSON.stringify(produits));
        body.set('total', String(total));
        body.set('idClient', String(idClient));
        return this.http.post<{ success: boolean, codeCommande: number }>(
            environment.backendAPI + 'commandes/creer',
            body.toString(),
            {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
            }
        );
    }

    majMotDePasseClient(login: string, password: string, old_password: string) {
        let body = new URLSearchParams();
        body.set('login', login);
        body.set('password', password);
        body.set('old_password', old_password);
        return this.http.post<{ success: boolean }>(
            environment.backendAPI + 'users/account/updatePassword',
            body.toString(),
            {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
            }
        );
    }
}
