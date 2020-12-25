import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    AjouterUneQuantite,
    SupprimerProduitPanier,
    SupprimerUneQuantite,
    ViderPanier
} from '../../../partage/actions/panier-action';
import {PanierProduit} from '../../../partage/panierProduit';
import {Observable, Subscription} from 'rxjs';
import {ProduitState} from '../../../partage/states/produit-state';
import {Store} from '@ngxs/store';
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {Client} from "../../../partage/client";
import {Router} from "@angular/router";
import {CompteService} from "../../compte/compte.service";

@Component({
    selector: 'app-panier',
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {

    produits$: Observable<PanierProduit[]>;
    taillePanier$: Observable<number>;
    total$: Observable<number>;
    commandeResponse$: Observable<{ success: boolean, codeCommande: number }>;
    commandeSubscription: Subscription = null;
    clientSubscription: Subscription = null;
    client: Client;
    total: number = 0;
    lignesCommande = [];
    erreur : string = '';

    constructor(private store: Store, private compteService: CompteService, private router: Router) {
    }

    ngOnInit(): void {
        this.produits$ = this.store.select(state => state.panier.produits);
        this.taillePanier$ = this.store.select(ProduitState.getNombreProduits);
        this.total$ = this.store.select(ProduitState.getTotalPanier);
        this.clientSubscription = this.store.select(UtilisateurState.getClient).subscribe(x => this.client = x)
    }

    ngOnDestroy() {
        this.checkCommande();
        if (this.clientSubscription != null)
            this.clientSubscription.unsubscribe();
    }

    getTotalCommande(): void {
        if (this.total$)
            this.total$.subscribe(val => this.total = val);
    }

    getProduits(): void {
        if (this.produits$)
            this.produits$.subscribe(produits => {
                produits.forEach(p => {
                    this.lignesCommande.push({"idMaillot": p.id, "quantite": p.quantite})
                });
            });
    }

    ViderPanier(): void {
        this.store.dispatch(new ViderPanier());
    }

    SupprimerUneQuantite(p: PanierProduit): void {
        this.store.dispatch(new SupprimerUneQuantite(p));
    }

    SupprimerProduitPanier(p: PanierProduit): void {
        this.store.dispatch(new SupprimerProduitPanier(p));
    }

    AjouterUneQuantite(p: PanierProduit): void {
        if (p.quantite < p.stock)
            this.store.dispatch(new AjouterUneQuantite(p));
    }

    verifierCommande(): boolean{
        if (this.lignesCommande.length == 0){
            this.erreur = "Votre panier est vide";
            return false;
        }

        if (this.total == 0){
            this.erreur = "Le montant total est erroné";
            return false;
        }

        if (!this.client.login){
            this.erreur = "Veuillez vous connecter pour valider votre commande";
            return false;
        }

        return true;

    }

    ValiderCommande(): void {
        this.getTotalCommande();
        this.getProduits();
        if (!this.verifierCommande())
            return;

        this.commandeResponse$ = this.compteService.nouvelleCommande(this.lignesCommande, this.client.idClient, this.total);
        this.checkCommande();

        this.commandeSubscription = this.commandeResponse$.subscribe(body => {
            if (body.success) {
                this.router.navigate(['produits/panier/confirmation', body.codeCommande]);
                this.ViderPanier();
            }
        });

    }

    checkCommande() {
        if (this.commandeSubscription != null) {
            this.commandeSubscription.unsubscribe();
        }
    }
}
