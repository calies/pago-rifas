import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent }		from './components/default.component';
import { LoginComponent }		from './components/login.component';
import { AuthGuard }                from './auth-guard.service';
import { DashboardComponent }  from './components/dashboard.component';

import { RifasComponent }  from './components/rifa/rifa-list.component';
import { PagoOnlineComponent }  from './components/rifa/pago-online.component';


const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'pago/:token',
		component: PagoOnlineComponent
	},
	{
		path: 'index',
		component: DefaultComponent
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],	
		children: [
				{
					path: 'rifas',
					//data:{ roles:['1'] }, 
					children: [
						{path: '', component: RifasComponent},
						{path: '**', redirectTo: '' }
					]
				}
	    	]
	},
	{
		path: '**', redirectTo: '' 
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
