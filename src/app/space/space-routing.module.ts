import { DestructionRoomComponent } from './destruction-room/destruction-room.component';
import { EngineersRoomComponent } from './engineers-room/engineers-room.component';
import { HangarComponent } from './hangar/hangar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestructionGuard } from './destruction.guard';
import { PilotFormComponent } from './pilot-form/pilot-form.component';
import { PilotResolver } from './pilot.reslover';

const routes: Routes = [
	{
		path: 'space',
		component: HangarComponent,
		children: [
			{ path: 'production', component: EngineersRoomComponent },
			{
				path: 'destruction',
				component: DestructionRoomComponent,
				canActivate: [DestructionGuard],
			},
			{ path: '', redirectTo: 'production', pathMatch: 'full' },
		],
	},
	{
		path: 'space/pilots/:id',
		component: PilotFormComponent,
		resolve: { pilot: PilotResolver },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SpaceRoutingModule {}
