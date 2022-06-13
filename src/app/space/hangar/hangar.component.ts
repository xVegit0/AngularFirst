import { Component, OnInit } from '@angular/core';
import { BomberShip } from '../bomber-ship';
import { FighterShip } from '../fighter-ship';
import { Pilot } from '../pilot';
import { SpaceShip } from '../space-ship';

@Component({
  selector: 'app-hangar',
  templateUrl: './hangar.component.html',
  styleUrls: ['./hangar.component.css']
})
export class HangarComponent implements OnInit {
  spaceShips: SpaceShip[] = [];

  constructor() { }

  ngOnInit(): void {
    this.spaceShips.push(new FighterShip(new Pilot('Lee Adama', '/assets/adama.png')));
    this.spaceShips.push(new BomberShip());
  }

}
