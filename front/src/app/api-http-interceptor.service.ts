import {UtilisateurState} from './partage/states/utilisateur-state';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {InscriptionJWT} from 'src/app/partage/actions/utilisateur-action';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

    private jwtToken: string = '';

    constructor(private router: Router, private store: Store) {
        this.store.select(UtilisateurState.getJWTToken).subscribe(val => this.jwtToken = val);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.jwtToken !== '') {
            req = req.clone({setHeaders: {Authorization: `Bearer ${this.jwtToken}`}});
        }

        return next.handle(req).pipe(tap(
            (evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    let tab: Array<string>;
                    let enteteAuthorization = evt.headers.get("Authorization");
                    if (enteteAuthorization != null) {
                        tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
                        if (tab.length > 1) {
                            this.jwtToken = tab[1];
                            this.store.dispatch(new InscriptionJWT(this.jwtToken));
                        }
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                    switch (error.status) {
                        case 401:
                            this.store.dispatch(new InscriptionJWT(''));
                            break;
                    }
                    return of(null);
                }
            ));
    }
}
