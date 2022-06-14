import { SpaceShipService } from './../space-ship.service';
import { OrderFormValue } from './../order-form-value';
import { SpaceShipType } from './../space-ship-type';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceShip } from '../space-ship';
import { map } from 'rxjs';
interface ShipType {
	label: string;
	value: SpaceShipType;
}
@Component({
	selector: 'app-engineers-room',
	templateUrl: './engineers-room.component.html',
	styleUrls: ['./engineers-room.component.css'],
})
export class EngineersRoomComponent implements OnInit {
	shipsCount = this.spaceShipService.hangarShips.pipe(
		map((ships) => ships.length)
	);

	spaceShipTypes: ShipType[] = [
		{ label: 'Myśliwiec', value: SpaceShipType.Fighter },
		{ label: 'Bombowiec', value: SpaceShipType.Bomber },
	];
	isProducing: boolean = false;

	form = new FormGroup({
		shipType: new FormControl(SpaceShipType.Fighter, {
			validators: [Validators.required],
			nonNullable: true,
		}),
		shipCount: new FormControl(1, {
			validators: [
				Validators.required,
				Validators.min(1),
				Validators.max(5000),
			],
			nonNullable: true,
		}),
	});

	constructor(private spaceShipService: SpaceShipService) {}

	ngOnInit(): void {}

	orderSpaceShips() {
		const formValue: OrderFormValue = this.form.getRawValue();
		this.isProducing = true;
		this.spaceShipService.produceShips(formValue).subscribe({
			complete: () => (this.isProducing = false),
		});
	}
}
