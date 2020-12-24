import {Action, Selector, State, StateContext} from '@ngxs/store';
import {InscriptionConnexion, InscriptionJWT} from '../actions/utilisateur-action';
import {UtilisateurStateModel} from "./utilisateur-model";
import {Injectable} from "@angular/core";
import {Client} from "../client";

@State<UtilisateurStateModel>({
    name: 'account',
    defaults: {
        jwtToken: '',
        client: new Client
    }
})
@Injectable()
export class UtilisateurState {

    @Selector()
    static getJWTToken(state: UtilisateurStateModel): string {
        return state.jwtToken;
    }

    @Selector()
    static getLogin(state: UtilisateurStateModel): string {
        return state.client.login;
    }

    @Selector()
    static getId(state: UtilisateurStateModel): number {
        if (state.client.idClient == null)
            return -1;
        return state.client.idClient;
    }

    @Selector()
    static getClient(state: UtilisateurStateModel): Client {
        return state.client;
    }

    @Action(InscriptionJWT)
    ajoutJWT(
        {patchState}: StateContext<UtilisateurStateModel>,
        {payload}: InscriptionJWT
    ): void {
        patchState({
            jwtToken: payload
        });
    }

    @Action(InscriptionConnexion)
    ajoutUtilisateur(
        {patchState}: StateContext<UtilisateurStateModel>,
        {payload}: InscriptionConnexion
    ): void {
        patchState({
            client: payload,
        });
    }
}
