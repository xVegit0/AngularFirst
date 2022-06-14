import { Pilot } from './../pilot';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-pilot',
    templateUrl: './pilot.component.html',
    styleUrls: ['./pilot.component.css'],
})
export class PilotComponent implements OnInit {
    @Input() pilot!: Pilot;

    constructor() {}

    ngOnInit(): void {}
}
