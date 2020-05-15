import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams }                  from '@angular/common/http';
import { Router }      from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { environment } from '../../environments/environment';


@Injectable()
export class ActionsService {
    loading: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private _http: HttpClient,
        public router: Router,
        public snackBar: MatSnackBar
    ){}

    emitLoadingEvent(state) {
        console.log('state');
        console.log(state);  
        this.loading.emit(state);
    }
    
    getLoadingStatus() {
        console.log('getLoadingStatus');
        console.log(this.loading);

        return this.loading;
    }

    setLoadingStatus(pBool) {
        this.emitLoadingEvent(pBool);
    }

    /////////////////////
    //SNACK BAR ACTIONS//
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }
    //END SNACK BAR ACTIONS//
    /////////////////////////


    uploadImage(formData){
        return this._http.post(environment.url+'/upload-image', formData);
    }
}