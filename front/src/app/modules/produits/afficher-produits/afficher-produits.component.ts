import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Produit} from '../../../partage/produit';
import {RecupererProduitService} from '../recuperer-produit.service';
import {map} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {ProduitState} from '../../../partage/states/produit-state';
import {AjouterProduitPanier} from '../../../partage/actions/panier-action';

@Component({
    selector: 'app-afficher-produits',
    templateUrl: './afficher-produits.component.html',
    styleUrls: ['./afficher-produits.component.css']
})
export class AfficherProduitsComponent implements OnInit {

    produits$: Observable<Produit[]>;
    filtres: BehaviorSubject<Array<any>>;
    produitsFiltres$: Observable<Produit[]>;
    panier$: Observable<number>;

    constructor(private apiService: RecupererProduitService, private store: Store) {
    }

    ngOnInit(): void {
        this.panier$ = this.store.select(ProduitState.getNombreProduits);
        this.produits$ = this.apiService.getProduits();
        this.filtres = new BehaviorSubject(['', '', '', 0]);
        this.produitsFiltres$ = combineLatest([this.produits$, this.filtres]).pipe(
            map(
                ([produits, filtres]: [Produit[], Array<any>]): Produit[] => {
                    return produits.filter(produit => {
                        let nom: boolean;
                        let marque: boolean;
                        let equipe: boolean;
                        let prixMax: boolean;

                        if (filtres[0] === null || filtres[0].length === 0) {
                            nom = true;
                        } else {
                            nom = produit.nom.toLocaleLowerCase().includes(filtres[0].toLocaleLowerCase());
                        }

                        if (filtres[1] === null || filtres[1].length === 0 || filtres[1] === 'Toutes') {
                            marque = true;
                        } else {
                            marque = produit.marque.toLocaleLowerCase().includes(filtres[1].toLocaleLowerCase());
                        }

                        if (filtres[2] === null || filtres[2].length === 0 || filtres[2] === 'Toutes') {
                            equipe = true;
                        } else {
                            equipe = produit.equipe.toLocaleLowerCase().includes(filtres[2].toLocaleLowerCase());
                        }

                        if ((filtres[3] === 0 || filtres[3] === null || filtres[3] === '')) {
                            prixMax = true;
                        } else {
                            prixMax = produit.prix <= filtres[3];
                        }

                        return nom && marque && equipe && prixMax;
                    });
                }
            ),
        );
    }

    onFilterEvent(filtres: Array<any>): void {
        this.filtres.next(filtres);
    }

    public ajoutPanier(p: Produit): void {
        this.store.dispatch(new AjouterProduitPanier(p));
    }
}
