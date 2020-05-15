import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';
import { Deposito } from "../models/deposito.model";

import { environment } from '../../environments/environment';

@Injectable()
export class DepositoService extends CRUDAbstractService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){
		super();
	}

	getAll(){
		let params = 'authorization='+JSON.parse(this._authService.getToken());
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/list", params, {headers: headers});
	}

	
	create( pDep ){
		let json = JSON.stringify(pDep);
		
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		//console.log(params);
		return this._http.post(environment.url+"/deposito/new", params, {headers: headers});
	}

	read( pId ){
		let json = {
			'deposito_id': pId
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/detail", params, {headers: headers});
	}

	listByParameter( pData, pBy ){
		let json = {
			'value': pData,
			'by': pBy
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/list-by-parameter", params, {headers: headers});
	}

	update( pDep ){
		let json = JSON.stringify(pDep);
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/edit", params, {headers: headers});
	}

	saveBanco( pDeps ){
		let json = JSON.stringify(pDeps);
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/save-banco", params, {headers: headers});
	}

	saveTarjetas( pDeps ){
		let json = JSON.stringify(pDeps);
		var re = /&/g; 
		json = json.replace(re, "");
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/save-tarjetas", params, {headers: headers});
	}

	delete(pId){
		let json = {
			'deposito_id': pId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/deposito/delete", params, {headers: headers});
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
	    return this._http.post(environment.url+'/upload-image/depositos', formData);
	}

	uploadCsv(formData, pTipoCsv){
	    return this._http.post(environment.url+'/deposito/upload-csv/depositos/'+pTipoCsv, formData);
	}
}
