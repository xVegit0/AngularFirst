import { SpaceShipService } from './../space-ship.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pilot } from '../pilot';
import { PilotRoomComponent } from '../pilot-room/pilot-room.component';
import { SpaceShip } from '../space-ship';

@Component({
    selector: 'app-hangar',
    templateUrl: './hangar.component.html',
    styleUrls: ['./hangar.component.css'],
})
export class HangarComponent implements OnInit {
    spaceShips = this.spaceShipService.hangarShips;
    selectedPilot: Pilot | null = null;
    @ViewChild(PilotRoomComponent) pilotRoom!: PilotRoomComponent;

    constructor(private spaceShipService: SpaceShipService) {}

    ngOnInit(): void {}

    setSelectedPilot(pilot: Pilot | null) {
        this.selectedPilot = pilot;
    }

    deassignPilot(spaceShip: SpaceShip) {
        if (!spaceShip.pilot) {
            return;
        }
        this.pilotRoom.pilotReturn(spaceShip.pilot);
        spaceShip.pilot = undefined;
    }

    assignPilot(spaceShip: SpaceShip): void {
        if (!this.selectedPilot) {
            return;
        }
        spaceShip.pilot = this.selectedPilot;
        this.pilotRoom.pilotLeave(this.selectedPilot);
    }
}
