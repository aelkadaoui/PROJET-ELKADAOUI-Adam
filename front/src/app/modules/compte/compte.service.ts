import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Client} from "../../partage/client"
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CompteService {
    constructor(private http: HttpClient) {
    }

    connexion(login: string, password: string): Observable<{ success: boolean, login: string }> {
        let body = new URLSearchParams();
        body.set('login', login);
        body.set('password', password);

        return this.http.post<{ success: boolean, login: string }>(
            environment.backendAPI + 'users/login',
            body.toString(),
            {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
            }
        );
    }

    inscriptionClient(client: Client): Observable<{ success: boolean, login: string }> {
        let body = new URLSearchParams();
        body.set('client', JSON.stringify(client));
        return this.http.post<{ success: boolean, login: string }>(
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
}
