import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AfficherProduitsComponent} from './afficher-produits/afficher-produits.component';
import {PanierComponent} from './panier/panier.component';
import {DetailsComponent} from './details/details.component';
import {ConfirmationPanierComponent} from "./confirmation-panier/confirmation-panier.component";

const routes: Routes = [
    {
        path: '',
        component: AfficherProduitsComponent
    },
    {
        path: 'panier',
        component: PanierComponent
    },
    {
        path: 'panier/confirmation/:id',
        component: ConfirmationPanierComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProduitComponentRoutingModule {
}
