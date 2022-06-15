import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PilotValidators } from '../pilot-validators';
import { PilotService } from '../pilot.service';
import { PilotAttrs } from '../pilot';

@Component({
	selector: 'app-pilot-form',
	templateUrl: './pilot-form.component.html',
	styleUrls: ['./pilot-form.component.css'],
})
export class PilotFormComponent implements OnInit {
	form = new FormGroup({
		id: new FormControl(undefined, {nonNullable: true}),
    firstName: new FormControl('', {
      validators: [Validators.required, PilotValidators.pilotName],
      nonNullable: true
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [PilotValidators.pilotForbidden],
      nonNullable: true,
      updateOn: 'blur'
  }),
		imageUrl: new FormControl('', { nonNullable: true }),
	});

	constructor(
		private route: ActivatedRoute,
		private pilotService: PilotService,
		private router: Router
	) {}

	ngOnInit() {
		this.route.data
			.pipe(map((data) => data['pilot']))
			.subscribe((pilot) => this.form.patchValue(pilot));
	}

	save(): void {
		const pilotAttrs = this.form.getRawValue();
		this.pilotService.savePilot(pilotAttrs).subscribe({
			next: () =>
				this.router.navigate(['../..'], { relativeTo: this.route }),
			error: () => alert('Nie udało się zapisać pilota!'),
		});
	}
}
