import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';
import { User } from "../models/user.model";

import { environment } from '../../environments/environment';

@Injectable()
export class UserService extends CRUDAbstractService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){
		super();
	}

	getAll(){
		let params = 'authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/user/list", params, {headers: headers});
	}

	create( pUsr ){
		let json = JSON.stringify(pUsr);
		let params = 'json='+json+'&authorization='+this._authService.getToken();
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
//console.log(params);
		return this._http.post(environment.url+"/user/new", params, {headers: headers});
	}

	read( pId ){
		let json = {
			'user_id': pId
		};

		let authorization = JSON.parse(this._authService.getToken());
		
		let params = 'authorization='+authorization+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/user/detail", params, {headers: headers});
	}

	update( pUser ){
		let json = JSON.stringify(pUser);
		let params = 'json='+json+'&authorization='+JSON.parse(this._authService.getToken());
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		console.log(params);
		return this._http.post(environment.url+"/user/edit", params, {headers: headers});
	}

	delete(pId){
		let json = {
			'user_id': pId
		};
		
		let params = 'authorization='+this._authService.getToken()+'&json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/user/delete", params, {headers: headers});
	}

	uploadImage(formData){
	    return this._http.post(environment.url+'/upload-image', formData);
	}

	forgetPassword(email) {
		let json = {
			"email": email
		};

		let params = 'json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
//console.log(params);
		return this._http.post(environment.url+"/user/reset",params, {headers: headers});
	}

	restorePassword(hash, password = null) {
		let json = {
			"hash" : hash,
			"newpassword": password
		}

		let params = 'json='+JSON.stringify(json);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
//console.log(environment.url+"/user/reset/confirm", params);
		return this._http.post(environment.url+"/user/reset/confirm", params, {headers: headers});
	}

	getActive() {
		return 0;
	}

	getInactive() {
		return 0;
	}

	getFiltered(pClient, pAll) {
		return 0;
	}
}
