import { Injectable } from '@angular/core';

//import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';
import { Pasajero } from "../models/pasajero.model";

import { environment } from '../../environments/environment';

@Injectable()
export class PasajeroService extends CRUDAbstractService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){
		super();
	}

	getAll(){
		let params = 'authorization='+JSON.parse(this._authService.getToken());
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/list", params, {headers: headers});
	}

	getPasajerosByViaje($pViaje){
		let json = {
			'viaje_id': $pViaje
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);


		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/list-by-viaje", params, {headers: headers});
	}

	getPasajerosByServicio($pServicio){
		let json = {
			'servicio_id': $pServicio
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);


		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/list-by-servicio", params, {headers: headers});
	}

	getPasajerosByItinerario($pItinerario, $pViaje){
		let json = {
			'itinerario_id': $pItinerario,
			'viaje_id': $pViaje
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);


		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/list-by-itinerario", params, {headers: headers});
	}

	
	create( pDep ){
		let json = JSON.stringify(pDep);
		
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		//console.log(params);
		return this._http.post(environment.url+"/pasajero/new", params, {headers: headers});
	}

	read( pId ){
		let json = {
			'pasajero_id': pId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/detail", params, {headers: headers});
	}

	uploadImage(formData){
	    return this._http.post(environment.url+'/upload-image', formData);
	}

	update( pDep ){
		let json = JSON.stringify(pDep);
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/edit", params, {headers: headers});
	}

	delete(pId){
		let json = {
			'pasajero_id': pId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/delete", params, {headers: headers});
	}

	getViajes(pPasajeroId){
		let json = {
			'pasajero_id': pPasajeroId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/get-viajes", params, {headers: headers});
	}

	saveViaje(pItiPas){
		let json = JSON.stringify(pItiPas);

		let params = 'authorization='+this._authService.getToken()+'&json='+json;
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/save-viaje", params, {headers: headers});	
	}

	getItinerarioViaje(pItiPas){
		let json = {
			'itinerariopasajero_id': pItiPas
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/get-itinerario-viaje", params, {headers: headers});
	}

	getDepositosRegistrosList(pItiPas){
		let json = {
			'itinerariopasajero_id': pItiPas
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/get-depositos-registros-list", params, {headers: headers});
	}

	getDepositosRegistros(pItiPas){
		let json = {
			'itinerariopasajero_id': pItiPas
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/pasajero/get-depositos-registros", params, {headers: headers});
	}

	getActive() {
		return 0;
	}

	getInactive() {
		return 0;
	}

	getFiltered(pPasajero, pAll) {
		return 0;
	}
}
