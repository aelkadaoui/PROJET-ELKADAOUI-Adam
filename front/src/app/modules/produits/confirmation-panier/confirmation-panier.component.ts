import {Component, OnInit} from '@angular/core';
import {Client} from "../../../partage/client";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {mergeMap} from "rxjs/operators";
import {CompteService} from "../../compte/compte.service";
import {Store} from "@ngxs/store";

@Component({
    selector: 'app-confirmation-panier',
    templateUrl: './confirmation-panier.component.html',
    styleUrls: ['./confirmation-panier.component.css']
})
export class ConfirmationPanierComponent implements OnInit {
    codeCommande: string;
    unClient$: Observable<Client>;

    constructor(private route: ActivatedRoute, private router: Router, private compteService: CompteService,
                private store: Store) {
    }

    ngOnInit(): void {
        this.codeCommande = this.route.snapshot.paramMap.get('id');
        this.getClient();
    }

    getClient(): void {
        this.unClient$ = this.store.select(UtilisateurState.getLogin)
            .pipe(
                mergeMap(
                    (login: string): Observable<Client> => {
                        if (login !== '' && login) {
                            return this.compteService.getUser(login);
                        } else {
                            this.router.navigate(['/']);
                        }
                    }
                )
            );
    }
}
