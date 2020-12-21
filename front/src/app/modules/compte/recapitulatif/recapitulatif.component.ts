import {Component, OnInit} from '@angular/core';
import {Client} from '../../../partage/client';
import {Observable, of} from "rxjs";
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {Store} from "@ngxs/store";
import {mergeMap} from "rxjs/operators";
import {CompteService} from "../compte.service";

@Component({
    selector: 'app-recapitulatif',
    templateUrl: './recapitulatif.component.html',
    styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {
    public unClient$: Observable<Client>;

    constructor(private compteService: CompteService, private store: Store) {
    }

    ngOnInit(): void {
        this.unClient$ = this.store.select(UtilisateurState.getLogin)
            .pipe(
                mergeMap(
                    (login: string): Observable<Client> => {
                        if (login !== '') {
                            return this.compteService.getUser(login);
                        } else {
                            return of(null);
                        }
                    }
                )
            );
    }
}
