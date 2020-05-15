import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';
// import { Rifa } from "../models/aeropuerto.model";

import { environment } from '../../environments/environment';

@Injectable()
export class GeoPayService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){}

	echoTest( pToken ){
		let json = {
			"token": pToken
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/geopay/echo-test", params, {headers: headers});
	}

	getPaymentURL( pToken ){
		let json = {
			"token": pToken
		};
		
		let params = 'token='+pToken;
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post("https://geopaytest.geocom.com.uy:8099/geoswitchService/rest/process/requestPayment", params, {headers: headers});
	}

	initPayment( pToken, pAmount, pDepartment, pEmail, pFName, pLName, pMobile, pVentaID ){
		let json = {
			"token": pToken,
			"amount": pAmount,
			"client_department": pDepartment,
			"client_email": pEmail,
			"client_fname": pFName,
			"client_lname": pLName,
			"client_mobile": pMobile,
			"venta_id": pVentaID
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/geopay/init-payment", params, {headers: headers});
	}

	externalPayment( pToken, pAmount, pDepartment, pEmail, pFName, pLName, pMobile, pVentaID ){
		let json = {
			"token": pToken,
			"amount": pAmount,
			"client_department": pDepartment,
			"client_email": pEmail,
			"client_fname": pFName,
			"client_lname": pLName,
			"client_mobile": pMobile,
			"venta_id": pVentaID
		};

		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/geopay/init-payment", params, {headers: headers});
	}
}
