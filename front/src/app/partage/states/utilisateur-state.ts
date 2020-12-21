import {Action, Selector, State, StateContext} from '@ngxs/store';
import {InscriptionConnexion, InscriptionJWT} from '../actions/utilisateur-action';
import {UtilisateurStateModel} from "./utilisateur-model";
import {Injectable} from "@angular/core";

@State<UtilisateurStateModel>({
    name: 'account',
    defaults: {
        login: '',
        jwtToken: '',
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
        return state.login;
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
            login: payload
        });
    }
}
