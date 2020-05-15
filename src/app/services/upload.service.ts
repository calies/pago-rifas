import { Injectable } from '@angular/core';

//import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders, HttpParams } 					from '@angular/common/http';
import { AuthService } from '../auth.service';
import { CRUDAbstractService } from './crud-abstract.service';

import { environment } from '../../environments/environment';

@Injectable()
export class UploadService{
	constructor(
		private _http: HttpClient,
		private _authService: AuthService
	){}

	makeFileRequest(token, url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			var name_file_input = params[0];
			for(var i=0; i < files.length; i++){
				formData.append(name_file_input, files[i], files[i].name);
			}

			formData.append('authorization', token);

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			};

			xhr.open('POST', url, true);
			xhr.send(formData);
		});
	}
}
