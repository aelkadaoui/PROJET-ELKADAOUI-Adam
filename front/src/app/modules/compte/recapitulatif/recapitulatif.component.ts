import {Component, OnInit} from '@angular/core';
import {Client} from '../../../partage/client';
import {Observable, Subscription} from "rxjs";
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {Store} from "@ngxs/store";
import {CompteService} from "../compte.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import pays from '../../../../assets/country.json';

@Component({
    selector: 'app-recapitulatif',
    templateUrl: './recapitulatif.component.html',
    styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {
    client: Client;
    passwordPattern: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,256}$';
    passwordForm: FormGroup = this.formBuilder.group({
        old_password: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
        password_confirmation: ['', [Validators.required]]
    });
    listePays = pays;
    isValidFormSubmitted: boolean = null;
    majResponse$: Observable<{ success: boolean }>;
    maj$: Subscription = null;
    civilite: string;
    nom: string;
    prenom: string;
    adresse: string;
    codePostal: string;
    ville: string;
    pays: string;
    indicatif: string;
    tel: string;
    email: string;
    erreur: string = '';
    success: string = '';
    old_passwordClient: string = '';
    isValidFormSubmittedUpdateClient: boolean = null;
    erreur_old_password: string;
    login: string;
    clientSubscription: Subscription;

    constructor(private formBuilder: FormBuilder, private router: Router, private store: Store,
                private compteService: CompteService) {
    }


    get old_password(): AbstractControl {
        return this.passwordForm.get('old_password');
    }

    get password(): AbstractControl {
        return this.passwordForm.get('password');
    }

    get password_confirmation(): AbstractControl {
        return this.passwordForm.get('password_confirmation');
    }


    ngOnInit(): void {
        this.clientSubscription = this.store.select(UtilisateurState.getClient).subscribe(x => this.client = x)
        if (!this.client.idClient)
            this.router.navigate(['compte/connexion']);
        this.old_passwordClient = this.client.passwd;
        this.login = this.client.login;
    }

    ngOnDestroy(): void {
        this.checkMaj();
        if (this.clientSubscription != null)
            this.clientSubscription.unsubscribe();
    }

    checkMaj(): void {
        if (this.maj$ != null) {
            this.maj$.unsubscribe();
        }
    }

    checkAncienMotDePasse(): boolean {
        if (this.old_passwordClient != this.old_password.value) {
            this.erreur_old_password = "Ancien mot de passe erronée.";
            return false;
        }
        this.erreur_old_password = '';
        return true;
    }

    checkNouveauMotDePasse(): boolean {
        if (this.password.value != this.password_confirmation.value) {
            this.erreur = "Les mots de passes ne correspondent pas.";
            return false;
        }
        this.erreur = '';
        return true;
    }

    checkMotDePasseDifferentAncien(): boolean {
        if (this.password.value != this.password_confirmation.value) {
            this.erreur = "L'ancien et le nouveau mot de passe sont les mêmes. '";
            return false;
        }
        this.erreur = '';
        return true;
    }

    changerMotDePasse() {
        this.isValidFormSubmitted = false;

        if (this.passwordForm.invalid)
            return;
        if (!this.checkAncienMotDePasse())
            return;
        if (!this.checkNouveauMotDePasse())
            return;
        if (!this.checkMotDePasseDifferentAncien())
            return;

        this.isValidFormSubmitted = true;

        this.majResponse$ = this.compteService.majMotDePasseClient(this.login, this.password.value, this.old_passwordClient);
        this.checkMaj();

        this.maj$ = this.majResponse$.subscribe(body => {
            if (body.success) {
                this.success = "Votre mot de passe a été mis à jour";
                this.resetPasswordForm();
            }
        });

    }

    resetPasswordForm(): void {
        this.isValidFormSubmitted = null;
        this.old_password.setValue('');
        this.password.setValue('');
        this.password_confirmation.setValue('');
    }

    updateClient() {
        this.isValidFormSubmittedUpdateClient = false;
    }

    changeCivilite(e): void {
        this.civilite = e.target.value;
    }

    changePays(e): void {
        this.pays = e.target.value;
    }
}
