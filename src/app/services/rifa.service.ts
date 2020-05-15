import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';
// import { Rifa } from "../models/aeropuerto.model";

import { environment } from '../../environments/environment';

@Injectable()
export class RifaService extends CRUDAbstractService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){
		super();
	}

	getAll(){
		let params = 'authorization='+JSON.parse(this._authService.getToken());
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/rifa/list", params, {headers: headers});
	}

	
	create( pRif ){
		let json = JSON.stringify(pRif);
		
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		//console.log(params);
		return this._http.post(environment.url+"/rifa/new", params, {headers: headers});
	}

	read( pId ){
		let json = {
			'aeropuerto_id': pId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/rifa/detail", params, {headers: headers});
	}

	update( pRif ){
		let json = JSON.stringify(pRif);
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/rifa/edit", params, {headers: headers});
	}

	delete(pId){
		let json = {
			'aeropuerto_id': pId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/rifa/delete", params, {headers: headers});
	}

	getRifasByPasajero(pId){
		let json = {
			'itinerarioPasajero_id': pId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/talon/get-by-pasajero/student", params, {headers: headers});
	}

	search(pFilterTxt){
		let json = {
			'filter_txt': pFilterTxt
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/talon/search", params, {headers: headers});
	}

	entregaRifas(pDesde, pHasta, pPasId){
		let json = {
			'talon_desde': pDesde,
			'talon_hasta': pHasta,
			'itinerario_pasajero_id': pPasId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/talon/entrega-rifas", params, {headers: headers});
	}

	getLinkPago( pData ){
		let json = pData;
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/talon/generar-link/student", params, {headers: headers});
	}

	validateRifaToken( pToken ){
		let json = {
			"token": pToken
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/talon/validate-link", params, {headers: headers});
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

	uploadImage(formData){
	    return this._http.post(environment.url+'/upload-image/aeropuertos', formData);
	}
}
