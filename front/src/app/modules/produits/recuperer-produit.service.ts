import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Produit} from '../../partage/produit';
import {Equipe} from '../../partage/equipe';
import {map} from 'rxjs/operators';
import {Marque} from "../../partage/marque";

@Injectable({
    providedIn: 'root'
})
export class RecupererProduitService {

    constructor(private http: HttpClient) {
    }

    public getProduits(): Observable<Produit[]> {
        return this.http.get<Produit[]>(environment.backendAPI + 'maillots/all');
    }

    getProduit(id: number): Observable<Produit> {
        return this.getProduits().pipe(
            map(
                (produits: Produit[]): Produit => {
                    return produits.find((p) => p.id === id);
                }
            )
        );
    }

    public getEquipes(): Observable<Equipe[]> {
        return this.http.get<Equipe[]>(environment.backendAPI + 'equipes/all');
    }

    public getMarques(): Observable<Marque[]> {
        return this.http.get<Marque[]>(environment.backendAPI + 'marques/all');
    }
}
