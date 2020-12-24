import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../partage/client';
import pays from '../../../../assets/country.json';
import {Router} from '@angular/router';
import {Store} from "@ngxs/store";
import {CompteService} from "../compte.service";
import {InscriptionConnexion} from "../../../partage/actions/utilisateur-action";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-saisie-client',
    templateUrl: './saisie-client.component.html',
    styleUrls: ['./saisie-client.component.css']
})
export class SaisieClientComponent implements OnInit {

    unClient: Client = new Client();
    nomPattern: string = '^[A-Za-z ]{1,256}$';
    prenomPattern: string = '^[A-Za-z]{1,256}$';
    adressePattern: string = '^[A-Za-z0-9 ]{1,256}$';
    villePattern: string = '^[A-Za-z]{1,256}$';
    telPattern: string = '^[0-9]{10,16}$';
    emailPattern: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';
    loginPattern: string = '^[A-Za-z0-9]{8,256}$';
    passwordPattern: string = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,256}$';
    listePays = pays;
    isValidFormSubmitted: boolean = null;
    inscriptionResponse$: Observable<{ success: boolean, login: string }>;
    inscription: Subscription = null;
    userForm: FormGroup = this.formBuilder.group({
        civilite: ['Homme', [Validators.required]],
        nom: ['', [Validators.required, Validators.pattern(this.nomPattern)]],
        prenom: ['', [Validators.required, Validators.pattern(this.prenomPattern)]],
        adresse: ['', [Validators.required, Validators.pattern(this.adressePattern)]],
        codePostal: ['', [Validators.required]],
        ville: ['', [Validators.required, Validators.pattern(this.villePattern)]],
        pays: ['France', [Validators.required]],
        indicatif: [{value: this.listePays[0].dial_code, disabled: true}],
        tel: ['', [Validators.required, Validators.pattern(this.telPattern)]],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        login: ['', [Validators.required, Validators.pattern(this.loginPattern)]],
        password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });

    constructor(private formBuilder: FormBuilder, private router: Router, private store: Store,
                private compteService: CompteService) {
    }

    get civilite(): AbstractControl {
        return this.userForm.get('civilite');
    }

    get nom(): AbstractControl {
        return this.userForm.get('nom');
    }

    get prenom(): AbstractControl {
        return this.userForm.get('prenom');
    }

    get adresse(): AbstractControl {
        return this.userForm.get('adresse');
    }

    get codePostal(): AbstractControl {
        return this.userForm.get('codePostal');
    }

    get ville(): AbstractControl {
        return this.userForm.get('ville');
    }

    get pays(): AbstractControl {
        return this.userForm.get('pays');
    }

    get indicatif(): AbstractControl {
        return this.userForm.get('indicatif');
    }

    get tel(): AbstractControl {
        return this.userForm.get('tel');
    }

    get email(): AbstractControl {
        return this.userForm.get('email');
    }

    get login(): AbstractControl {
        return this.userForm.get('login');
    }

    get password(): AbstractControl {
        return this.userForm.get('password');
    }

    ngOnDestroy(): void {
        this.check_inscription();
    }

    check_inscription(): void {
        if (this.inscription != null) {
            this.inscription.unsubscribe();
        }
    }

    ngOnInit(): void {

    }

    generateInputs(): void {
        this.jeuDeTest();
    }

    onFormSubmit(): void {
        this.isValidFormSubmitted = false;
        if (this.userForm.invalid) {
            this.unClient.resetClient();
            return;
        }
        this.isValidFormSubmitted = true;
        this.setClient();

        this.inscriptionResponse$ = this.compteService.inscriptionClient(this.unClient);

        this.check_inscription();

        this.inscription = this.inscriptionResponse$.subscribe(body => {
            if (body.success) {
                this.unClient.idClient = body['id'];
                this.store.dispatch(new InscriptionConnexion(this.unClient));
                this.router.navigate(['produits']);
            }
        });
    }

    setClient(): void {
        this.unClient.client(
            this.civilite.value, this.nom.value, this.prenom.value, this.adresse.value,
            this.codePostal.value, this.ville.value, this.pays.value, this.indicatif.value + this.tel.value.substring(1),
            this.email.value, this.login.value, this.password.value
        );
    }

    jeuDeTest(): void {
        this.userForm.controls.nom.setValue('El Kadaoui');
        this.userForm.controls.prenom.setValue('Adam');
        this.userForm.controls.adresse.setValue('2 rue de la Kirneck');
        this.userForm.controls.codePostal.setValue('67000');
        this.userForm.controls.ville.setValue('Strasbourg');
        this.userForm.controls.pays.setValue('Afghanistan');
        this.userForm.controls.tel.setValue('0608712591');
        this.userForm.controls.email.setValue('adam@gmail.com');
        this.userForm.controls.login.setValue('aelkadaoui67');
        this.userForm.controls.password.setValue('Mon_mot_de_passe67!');
        this.setIndicatif(this.userForm.controls.pays.value);

    }

    setIndicatif(value: string): void {
        this.listePays.forEach(element => {
                if (element.name === value) {
                    this.userForm.controls.indicatif.setValue(element.dial_code);
                    return;
                }
            }
        );
    }

    changeCivilite(e): void {
        this.userForm.controls.civilite.setValue(e.target.value, {
            onlySelf: true
        });
    }

    changePays(e): void {
        this.userForm.controls.pays.setValue(e.target.value, {
            onlySelf: true
        });
    }
}
