import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccueilComponent} from './accueil/accueil.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'compte',
        loadChildren: () =>
            import('./modules/compte/compte.module').then(
                m => m.CompteModule
            )
    },
    {
        path: 'produits',
        loadChildren: () =>
            import('./modules/produits/produits.module').then(
                m => m.ProduitsModule
            )
    },
    {
        path: '',
        component: AccueilComponent
    },
    {
        path: '**',
        component: AccueilComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
