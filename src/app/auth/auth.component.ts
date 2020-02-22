import { Component, HostBinding } from "@angular/core";
import { fadeStateTrigger } from '../shared/aminations/fade.animation';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})

export class AuthComponent {

    @HostBinding('@fade') a = true;

    constructor(){}
}