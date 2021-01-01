import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompteRoutingModule} from './compte-routing.module';
import {SaisieClientComponent} from './saisie-client/saisie-client.component';
import {RecapitulatifComponent} from './recapitulatif/recapitulatif.component';
import {PhonePipePipe} from './phone-pipe.pipe';
import {ConnexionComponent} from './connexion/connexion.component';
import {CommandesComponent} from './commandes/commandes.component';
import {CommandeComponent} from "./commande/commande.component";


@NgModule({
    declarations: [
        SaisieClientComponent,
        RecapitulatifComponent,
        PhonePipePipe,
        ConnexionComponent,
        CommandesComponent,
        CommandeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompteRoutingModule,
    ]
})
export class CompteModule {
}
