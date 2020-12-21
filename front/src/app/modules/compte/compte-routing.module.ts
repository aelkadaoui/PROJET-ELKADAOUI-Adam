import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SaisieClientComponent} from './saisie-client/saisie-client.component';
import {RecapitulatifComponent} from './recapitulatif/recapitulatif.component';
import {ConnexionComponent} from './connexion/connexion.component';

const routes: Routes = [
    {
        path: 'creation',
        component: SaisieClientComponent
    },
    {
        path: 'afficher',
        component: RecapitulatifComponent
    },
    {
        path: 'connexion',
        component: ConnexionComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CompteRoutingModule {
}
