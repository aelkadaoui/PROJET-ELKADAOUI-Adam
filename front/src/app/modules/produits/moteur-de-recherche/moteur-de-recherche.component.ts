import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {RecupererProduitService} from "../recuperer-produit.service";
import {Equipe} from "../../../partage/equipe";
import {Marque} from "../../../partage/marque";

@Component({
    selector: 'app-moteur-de-recherche',
    templateUrl: './moteur-de-recherche.component.html',
    styleUrls: ['./moteur-de-recherche.component.css']
})
export class MoteurDeRechercheComponent implements OnInit {

    @Output() filtreEvent: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
    filtreForm = new FormGroup({
        nomFiltre: new FormControl(''),
        marqueFiltre: new FormControl(''),
        equipeFiltre: new FormControl(''),
        prixMaxFiltre: new FormControl('')
    });
    equipes$: Observable<Equipe[]>;
    marques$: Observable<Marque[]>;
    private filtreFormSubscription: Subscription;

    constructor(private apiService: RecupererProduitService) {
    }

    ngOnInit(): void {
        this.equipes$ = this.apiService.getEquipes();
        this.marques$ = this.apiService.getMarques();
        this.filtreFormSubscription = this.filtreForm.valueChanges.subscribe(filtres => {
            this.filtreEvent.emit(
                [
                    filtres.nomFiltre,
                    filtres.marqueFiltre,
                    filtres.equipeFiltre,
                    filtres.prixMaxFiltre
                ]
            );
        });
    }

    ngOnDestroy(): void {
        this.filtreFormSubscription.unsubscribe();
    }
}


