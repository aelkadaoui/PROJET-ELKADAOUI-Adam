import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompteRoutingModule} from './compte-routing.module';
import {SaisieClientComponent} from './saisie-client/saisie-client.component';
import {RecapitulatifComponent} from './recapitulatif/recapitulatif.component';
import {PhonePipePipe} from './phone-pipe.pipe';
import {ConnexionComponent} from './connexion/connexion.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiHttpInterceptor} from "./api-http-interceptor.service";


@NgModule({
    declarations: [
        SaisieClientComponent,
        RecapitulatifComponent,
        PhonePipePipe,
        ConnexionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CompteRoutingModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true
        }
    ],
})
export class CompteModule {
}
