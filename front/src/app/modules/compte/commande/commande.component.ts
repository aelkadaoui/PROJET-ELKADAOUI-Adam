import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Commande} from "../../../partage/commande";
import {Store} from "@ngxs/store";
import {CompteService} from "../compte.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ligne} from "../../../partage/ligne";
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {Client} from "../../../partage/client";

@Component({
    selector: 'app-commande',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
    codeCommande: string = '';
    commande$: Observable<Commande>;
    commande: Commande;
    commandeSubscription: Subscription;
    lignesCommande: Ligne[];
    unClient$: Observable<Client>;
    client: Client;
    clientSubscription: Subscription;

    constructor(private store: Store, private router: Router, private route: ActivatedRoute, private compteService: CompteService) {
    }

    ngOnInit(): void {
        this.codeCommande = this.route.snapshot.paramMap.get('codeCommande');
        this.commande$ = this.compteService.getCommande(this.codeCommande);
        this.commandeSubscription = this.commande$.subscribe(val => [this.commande = val, this.lignesCommande = val.lignesCommande]);
        this.clientSubscription = this.store.select(UtilisateurState.getClient).subscribe(x => this.client = x)
        if (!this.client.idClient)
            this.router.navigate(['compte/connexion']);
    }

    ngOnDestroy(): void {
        this.commandeSubscription.unsubscribe();
        this.clientSubscription.unsubscribe();
    }

}
