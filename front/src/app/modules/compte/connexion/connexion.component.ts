import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngxs/store";
import {CompteService} from "../compte.service";
import {InscriptionConnexion} from "../../../partage/actions/utilisateur-action";
import {Router} from "@angular/router";
import {Client} from "../../../partage/client";

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
    submit: Boolean = false;
    loginForm: FormGroup;
    loginResponse$: Observable<{ success: boolean, login: string, id: number }>;
    login: Subscription = null;
    loginSuccess: boolean = false;
    unClient: Client = new Client;

    constructor(private compteService: CompteService, private store: Store, private router: Router) {
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnDestroy(): void {
        this.check_login();
    }

    check_login(): void {
        if (this.login != null) {
            this.login.unsubscribe();
        }
    }

    onSubmit() {
        this.submit = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loginResponse$ = this.compteService.connexion(this.loginForm.value.login, this.loginForm.value.password);
        this.check_login();

        this.login = this.loginResponse$.subscribe(body => {
            if (body.success) {
                this.setClient(body['client']);
                this.store.dispatch(new InscriptionConnexion(this.unClient));
                this.router.navigate(['produits']);
            }
        });

    }

    setClient(client: Client) {
        this.unClient.client(
            client.civilite, client.nom, client.prenom, client.adresse, client.cp, client.ville,
            client.pays, client.tel, client.mail, client.login, client.passwd);
        this.unClient.idClient = client.idClient;
    }
}
