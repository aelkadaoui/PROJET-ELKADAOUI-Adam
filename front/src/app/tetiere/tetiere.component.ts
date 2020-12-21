import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {UtilisateurState} from "../partage/states/utilisateur-state";
import {InscriptionConnexion, InscriptionJWT} from "../partage/actions/utilisateur-action";
import {ProduitState} from "../partage/states/produit-state";

@Component({
    selector: 'app-tetiere',
    templateUrl: './tetiere.component.html',
    styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent implements OnInit {

    public login$: Observable<string>;
    private taillePanier$: Observable<number>;

    constructor(private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        this.taillePanier$ = this.store.select(ProduitState.getNombreProduits);
        this.login$ = this.store.select(UtilisateurState.getLogin);
    }

    disconnect(): void {
        this.store.dispatch(new InscriptionConnexion(''));
        this.store.dispatch(new InscriptionJWT(''));
        this.router.navigate(['/compte/connexion']);
    }

}
