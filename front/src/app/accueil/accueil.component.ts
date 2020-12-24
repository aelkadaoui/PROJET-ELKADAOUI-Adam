import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

    constructor(private renderer: Renderer2) {
    }

    renderExternalScript(src: string): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'application/javascript';
        script.src = src;
        script.async = true;
        script.defer = true;
        this.renderer.appendChild(document.body, script);
        return script;
    }

    ngOnInit() {
        this.renderExternalScript('../../scripts.js').onload;
    }


}
