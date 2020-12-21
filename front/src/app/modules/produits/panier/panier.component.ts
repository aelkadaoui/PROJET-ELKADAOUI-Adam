import {Component, OnInit} from '@angular/core';
import {AjouterUneQuantite, SupprimerProduitPanier, SupprimerUneQuantite, ViderPanier} from '../../../partage/actions/panier-action';
import {PanierProduit} from '../../../partage/panierProduit';
import {Observable, of} from 'rxjs';
import {ProduitState} from '../../../partage/states/produit-state';
import {Store} from '@ngxs/store';
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {mergeMap} from "rxjs/operators";
import {Client} from "../../../partage/client";
import {Router} from "@angular/router";
import {CompteService} from "../../compte/compte.service";

@Component({
    selector: 'app-panier',
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

    public produits$: Observable<PanierProduit[]>;
    public taillePanier$: Observable<number>;
    public total$: Observable<number>;
    public login: boolean = false;
    public unClient$: Observable<Client>;

    constructor(private store: Store, private compteService: CompteService, private router: Router) {
    }

    ngOnInit(): void {
        this.produits$ = this.store.select(state => state.panier.produits);
        this.taillePanier$ = this.store.select(ProduitState.getNombreProduits);
        this.total$ = this.store.select(ProduitState.getTotalPanier);
        this.unClient$ = this.store.select(UtilisateurState.getLogin)
            .pipe(
                mergeMap(
                    (login: string): Observable<Client> => {
                        if (login !== '') {
                            return this.compteService.getUser(login);
                        } else {
                            return of(null);
                        }
                    }
                ));
    }

    public ViderPanier(): void {
        this.store.dispatch(new ViderPanier());
    }

    public SupprimerUneQuantite(p: PanierProduit): void {
        this.store.dispatch(new SupprimerUneQuantite(p));
    }

    public SupprimerProduitPanier(p: PanierProduit): void {
        this.store.dispatch(new SupprimerProduitPanier(p));
    }

    public AjouterUneQuantite(p: PanierProduit): void {
        this.store.dispatch(new AjouterUneQuantite(p));
    }

    ValiderCommande(): void {
        console.log("valider")
    }
}
