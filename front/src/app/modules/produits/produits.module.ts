import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoteurDeRechercheComponent} from './moteur-de-recherche/moteur-de-recherche.component';
import {AfficherProduitsComponent} from './afficher-produits/afficher-produits.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProduitComponentRoutingModule} from './produit-routing.module';
import {RecupererProduitService} from './recuperer-produit.service';
import {DetailsComponent} from './details/details.component';
import {PanierComponent} from './panier/panier.component';


@NgModule({
    declarations: [
        MoteurDeRechercheComponent,
        AfficherProduitsComponent,
        DetailsComponent,
        PanierComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProduitComponentRoutingModule
    ],
    providers: [RecupererProduitService],
})
export class ProduitsModule {
}
