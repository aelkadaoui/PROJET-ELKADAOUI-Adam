import {PanierProduit} from '../panierProduit';
import {ProduitStatesModel} from './produit-states-model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
    AjouterProduitPanier,
    AjouterUneQuantite,
    SupprimerProduitPanier,
    SupprimerUneQuantite,
    ViderPanier
} from './../actions/panier-action';
import {Injectable} from "@angular/core";

@Injectable()
@State<ProduitStatesModel>({
    name: 'panier',
    defaults: {
        produits: []
    }
})
export class ProduitState {
    @Selector()
    static getNombreProduits(state: ProduitStatesModel): number {
        let taillePanier: number = 0;

        state.produits.forEach((item) => {
            taillePanier += item.quantite;
        });

        return taillePanier;
    }

    @Selector()
    static getTotalPanier(state: ProduitStatesModel): number {
        let total: number = 0;

        state.produits.forEach((item) => {
            total += (item.quantite * item.prix);
        });

        return total;
    }

    @Action(AjouterProduitPanier)
    add(
        {getState, patchState}: StateContext<ProduitStatesModel>,
        {payload}: AjouterProduitPanier
    ): void {
        const state = getState();
        const index = state.produits.findIndex((element: PanierProduit) => element.id === payload.id);

        if (index === -1) {
            const panierProduit = new PanierProduit(payload.id,
                payload.nom,
                payload.type,
                payload.saison,
                payload.image,
                payload.prix,
                payload.stock,
                payload.marque,
                payload.equipe)
            panierProduit.quantite = 1;

            patchState({
                produits: [...state.produits, panierProduit]
            });
        } else {
            const majPanier = state.produits;
            majPanier[index].quantite++;
            if (majPanier[index].quantite > majPanier[index].stock)
                majPanier[index].quantite = majPanier[index].stock;

            patchState({
                produits: majPanier
            });
        }
    }

    @Action(AjouterUneQuantite)
    addOne(
        {getState, patchState}: StateContext<ProduitStatesModel>,
        {payload}: AjouterUneQuantite
    ): void {
        const state = getState();
        const index = state.produits.findIndex((element: PanierProduit) => element.id === payload.id);
        if (index !== -1) {
            const majPanier = state.produits;
            majPanier[index].quantite++;
            if (majPanier[index].quantite > majPanier[index].stock)
                majPanier[index].quantite = majPanier[index].stock;

            patchState({
                produits: majPanier
            });
        }
    }

    @Action(SupprimerUneQuantite)
    removeOne(
        {getState, patchState}: StateContext<ProduitStatesModel>,
        {payload}: SupprimerUneQuantite
    ): void {
        const state = getState();
        const index = state.produits.findIndex((element: PanierProduit) => element.id === payload.id);

        if (index !== -1) {
            const majPanier = state.produits;
            majPanier[index].quantite--;

            if (majPanier[index].quantite === 0) {
                majPanier.splice(index, 1);
            }

            patchState({
                produits: majPanier
            });
        }
    }

    @Action(SupprimerProduitPanier)
    remove(
        {getState, patchState}: StateContext<ProduitStatesModel>,
        {payload}: SupprimerProduitPanier
    ): void {
        const state = getState();
        const index = state.produits.findIndex((element: PanierProduit) => element.id === payload.id);

        if (index !== -1) {
            const majPanier = state.produits;
            majPanier.splice(index, 1);

            patchState({
                produits: majPanier
            });
        }
    }

    @Action(ViderPanier)
    clear(
        {patchState}: StateContext<ProduitStatesModel>,
    ): void {

        patchState({
            produits: []
        });
    }
}

