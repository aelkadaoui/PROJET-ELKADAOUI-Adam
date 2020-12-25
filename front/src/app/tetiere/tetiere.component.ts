import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {UtilisateurState} from "../partage/states/utilisateur-state";
import {InscriptionConnexion, InscriptionJWT} from "../partage/actions/utilisateur-action";
import {ProduitState} from "../partage/states/produit-state";
import {PanierProduit} from "../partage/panierProduit";
import {SupprimerProduitPanier} from '../partage/actions/panier-action';


@Component({
    selector: 'app-tetiere',
    templateUrl: './tetiere.component.html',
    styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent implements OnInit {

    login$: Observable<string>;
    produits$: Observable<PanierProduit[]>;
    taillePanier$: Observable<number>;
    total$: Observable<number>;

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        this.taillePanier$ = this.store.select(ProduitState.getNombreProduits);
        this.login$ = this.store.select(UtilisateurState.getLogin);
        this.produits$ = this.store.select(state => state.panier.produits);
        this.total$ = this.store.select(ProduitState.getTotalPanier);
    }

    disconnect(): void {
        this.store.dispatch(new InscriptionConnexion());
        this.store.dispatch(new InscriptionJWT(''));
        this.router.navigate(['/compte/connexion']);
    }

    SupprimerProduitPanier(p: PanierProduit): void {
        this.store.dispatch(new SupprimerProduitPanier(p));
    }

}
