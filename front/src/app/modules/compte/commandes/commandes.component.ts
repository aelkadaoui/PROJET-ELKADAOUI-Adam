import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Commande} from "../../../partage/commande";
import {Store} from "@ngxs/store";
import {CompteService} from "../compte.service";
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {mergeMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'app-commande',
    templateUrl: './commandes.component.html',
    styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

    commandes$: Observable<Commande[]>;

    constructor(private router: Router, private compteService: CompteService, private store: Store) {
    }

    ngOnInit(): void {
        this.commandes$ = this.store.select(UtilisateurState.getId)
            .pipe(
                mergeMap(
                    (id: number): Observable<Commande[]> => {
                        if (id !== -1) {
                            return this.compteService.getCommandes(id);
                        } else {
                            this.router.navigate(['compte/connexion']);
                        }
                    }
                )
            );
    }

}
