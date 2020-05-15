import { Injectable } from '@angular/core';

//import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';
import { Itinerario } from "../models/itinerario.model";

import { environment } from '../../environments/environment';

@Injectable()
export class ItinerarioService extends CRUDAbstractService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){
		super();
	}

	getAll(){
		let params = 'authorization='+JSON.parse(this._authService.getToken());
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/list", params, {headers: headers});
	}

	
	create( pDep ){
		let json = JSON.stringify(pDep);
		
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		//console.log(params);
		return this._http.post(environment.url+"/itinerario/new", params, {headers: headers});
	}

	read( pId ){
		let json = {
			'itinerario_id': pId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/detail", params, {headers: headers});
	}

	getTramos( pId ){
		let json = {
			'itinerario_id': pId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/tramos", params, {headers: headers});
	}

	getItinerariosByViaje( pViajeId ){
		let json = {
			'viaje_id': pViajeId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/get-by-viaje", params, {headers: headers});
	}

	saveTramos( pId, pTramos ){
		let json = {
			'itinerario_id': pId,
			'tramos': pTramos
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/save-tramos", params, {headers: headers});
	}

	update( pDep ){
		let json = JSON.stringify(pDep);
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/edit", params, {headers: headers});
	}

	delete(pId){
		let json = {
			'itinerario_id': pId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/itinerario/delete", params, {headers: headers});
	}

	uploadImage(formData){
	    return this._http.post(environment.url+'/upload-image', formData);
	}

	getActive() {
		return 0;
	}

	getInactive() {
		return 0;
	}

	getFiltered(pPais, pAll) {
		return 0;
	}
}
