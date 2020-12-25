import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Produit} from '../../../partage/produit';
import {ActivatedRoute, Router} from '@angular/router';
import {RecupererProduitService} from '../recuperer-produit.service';
import {AjouterProduitPanier, AjouterUneQuantite} from '../../../partage/actions/panier-action';
import {Store} from '@ngxs/store';
import {PanierProduit} from "../../../partage/panierProduit";


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

    produit$: Observable<Produit>;
    produits$: Observable<PanierProduit[]>;
    produit: Produit;
    produitSubscription: Subscription;
    quantite: number = 1;

    constructor(private produitService: RecupererProduitService, private route: ActivatedRoute,
                private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        this.produit$ = this.produitService.getProduit(parseInt(this.route.snapshot.paramMap.get('id')));
        this.produitSubscription = this.produit$.subscribe(val => this.produit = val);
        this.produits$ = this.store.select(state => state.panier.produits).pipe();
    }

    ngOnDestroy(): void {
        this.produitSubscription.unsubscribe();
    }

    AjouterProduitPanier(product: Produit, quantite: number): void {
        for (let i = 0; i < quantite; i++)
            this.store.dispatch(new AjouterProduitPanier(product));
    }

    AcheterMaintenant(produit: Produit, quantite: number) {
        this.AjouterProduitPanier(produit, quantite);
        this.router.navigate(['produits/panier']);
    }

    AjouterUn(product: Produit) {
        if (this.quantite < product.stock)
            this.quantite++;
    }

    SupprimerUn() {
        if (this.quantite > 1)
            this.quantite--;
    }
}
