import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Produit} from '../../../partage/produit';
import {ActivatedRoute, Router} from '@angular/router';
import {RecupererProduitService} from '../recuperer-produit.service';
import {AjouterProduitPanier} from '../../../partage/actions/panier-action';
import {Store} from '@ngxs/store';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

    produit$: Observable<Produit>;
    produit: Produit;
    produitSubscription: Subscription;
    quantite: number = 1;

    constructor(private produitService: RecupererProduitService, private route: ActivatedRoute,
                private store: Store, private router: Router) {
    }

    ngOnInit(): void {
        this.produit$ = this.produitService.getProduit(parseInt(this.route.snapshot.paramMap.get('id')));
        this.produitSubscription = this.produit$.subscribe(val => this.produit = val);
        if (!this.produit)
            this.router.navigate(["/"]);
    }

    ngOnDestroy(): void {
        this.produitSubscription.unsubscribe();
    }

    public AjouterProduitPanier(product: Produit, quantite: number): void {
        for (let i = 0; i < quantite; i++)
            this.store.dispatch(new AjouterProduitPanier(product));
    }

    public AcheterMaintenant(produit: Produit, quantite: number) {
        console.log(quantite);
        this.AjouterProduitPanier(produit, quantite);
        this.router.navigate(['produits/panier']);
    }

    public AjouterUn(product: Produit, quantite: number) {
        if (quantite < product.stock)
            this.quantite++;
    }

    public SupprimerUn(product: Produit, quantite: number) {
        if (quantite > 1)
            this.quantite--;
    }
}
