import {TestBed} from '@angular/core/testing';

import {RecupererProduitService} from './recuperer-produit.service';

describe('RecupererProduitService', () => {
    let service: RecupererProduitService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RecupererProduitService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
