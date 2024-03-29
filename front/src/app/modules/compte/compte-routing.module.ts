import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SaisieClientComponent} from './saisie-client/saisie-client.component';
import {RecapitulatifComponent} from './recapitulatif/recapitulatif.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {CommandesComponent} from './commandes/commandes.component';
import {CommandeComponent} from "./commande/commande.component";

const routes: Routes = [
    {
        path: 'creation',
        component: SaisieClientComponent
    },
    {
        path: 'profil',
        component: RecapitulatifComponent
    },
    {
        path: 'connexion',
        component: ConnexionComponent
    },
    {
        path: 'commandes',
        component: CommandesComponent
    },
    {
        path: 'commande/:codeCommande',
        component: CommandeComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CompteRoutingModule {
}
