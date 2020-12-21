import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngxs/store";
import {CompteService} from "../compte.service";
import {InscriptionConnexion} from "../../../partage/actions/utilisateur-action";
import {UtilisateurState} from "../../../partage/states/utilisateur-state";
import {Router} from "@angular/router";

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
    submit: Boolean = false;
    loginForm: FormGroup;
    jwtToken$: Observable<string>;
    loginResponse$: Observable<{ success: boolean, login: string }>;
    login: Subscription = null;
    loginSuccess: boolean = false;

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
        this.jwtToken$ = this.store.select(UtilisateurState.getJWTToken);
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
                this.loginSuccess = true;
                this.store.dispatch(new InscriptionConnexion(body.login));
                this.router.navigate(['compte/afficher']);
            }
        });
    }
}
