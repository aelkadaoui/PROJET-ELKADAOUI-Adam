import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TetiereComponent} from './tetiere/tetiere.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {CompteModule} from './modules/compte/compte.module';
import {AccueilComponent} from './accueil/accueil.component';
import {UtilisateurState} from './partage/states/utilisateur-state';
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {ProduitState} from "./partage/states/produit-state";
import {ProduitsModule} from "./modules/produits/produits.module";

@NgModule({
    declarations: [
        AppComponent,
        TetiereComponent,
        FooterComponent,
        AccueilComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        CompteModule,
        ProduitsModule,
        NgxsModule.forRoot([UtilisateurState, ProduitState], {developmentMode: environment.production})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
