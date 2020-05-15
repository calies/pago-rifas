import { Injectable, EventEmitter } 	from '@angular/core';
import { Http, Response, Headers } 		from '@angular/http';
import { Router }      					from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';

import { environment } 					from '../environments/environment';
import { User } 						from './models/user.model'; 
import { ActionsService } 				from './services/actions.service';
import { JsonMessage } 						from './models/json-message'; 

@Injectable()
export class AuthService {
	message: string;
	public internalUser: User;
	redirectUrl: string;
	public identity;
	public token;

	user = {
  		"email": "",
	  	"password": "",
	  	"getHash": false
	};

	constructor(
		private _http: HttpClient,
		public router: Router,
		public _actionsService: ActionsService
  	){}

	initUser(){
	  	this.token = this.getToken();
	  	let params = 'authorization='+this.token;
		// let params = { "authorization" : this.token};
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(environment.url+"/initUser", params, {headers: headers});
	}

	login(pMail, pPass, pHash = false, pRedirect){
		this.user.email = pMail;
		this.user.password = pPass;
		this.user.getHash = pHash;
		this.message = 'Login no valido!';
		this._actionsService.setLoadingStatus(true);

		let json = JSON.stringify(this.user);
		let params = 'json='+json;
		console.log(params);
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		this._http.post(environment.url+"/loginUser", params, {headers: headers})
				   .subscribe(
					  	message => {	
				  			let lMessage: any =	message;  
				  			console.log('lMessage 1');
				  			console.log(lMessage.status);
				  			console.log('message 2');
				  			console.log(message);
						  	if (lMessage.status == 'success') {
								this.identity = lMessage.data;
								console.log(this.identity);
								localStorage.setItem('identity', JSON.stringify(this.identity));

								this.user.email = pMail;
								this.user.password = pPass;
								this.user.getHash = true;

								let json = JSON.stringify(this.user);
								let params = 'json='+json;
								let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

								this.internalUser = new User(this.identity.sub, this.identity.name, this.identity.role, this.identity.email);
								this._http.post(environment.url+"/loginUser", params, {headers: headers})
										   .subscribe(
											  messageHash => {
											  	let lMessageHash:any = messageHash; 

												  if (lMessageHash.status == 'success') {
													this.token = lMessageHash.data;
													localStorage.setItem('token', JSON.stringify(this.token));
													let redirect = this.redirectUrl ? this.redirectUrl : pRedirect;
													// Redirect the user
													this.router.navigate([redirect]);
												  }else{
													this.message = lMessageHash.data;
												  }  
												  this._actionsService.setLoadingStatus(false);
												
												  console.log('messageHash');
												  console.log(messageHash);
												}

												
											  );


						  	}else{
								this._actionsService.setLoadingStatus(false);
								this.message = lMessage.data;
						  	} 

						  	console.log('lMessage'); 
						  	console.log(lMessage); 
						  	console.log('lMessage.status'); 
						  	console.log(lMessage.status); 
						  }
					);
		return this.message;
	}

	logout(): void {
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		this.identity = null;
		this.token = null;

		window.location.href = "/login";
	}

	isAuthenticated():boolean {
		return this.internalUser != undefined;
	}

	hasRole(roles: string[]):boolean {
		return this.isAuthenticated() && (roles.toString().indexOf(this.internalUser.role_id+'') > -1);
	}

	getToken(){
		let token = localStorage.getItem('token');

		if (token != "undefined") {
		  	this.token = token;
		}else{
		  	this.token = null;
		}

		return this.token;
	}

}