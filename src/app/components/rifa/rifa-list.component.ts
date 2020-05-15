import { Component, OnInit } from '@angular/core';

import { RifaService } 			from "../../services/rifa.service";
import { PasajeroService } 			from "../../services/pasajero.service";
import { Sort } 				from '@angular/material';
import { ActionsService } 		from "../../services/actions.service";
import { Common } 				from './../common';

@Component({
	selector: 'rifa-list',
	templateUrl: '../../views/rifa-list.html'
})

export class RifasComponent extends Common implements OnInit{
	public filterTxt:string = '';
	public errorTxt:string = '';
	public rifas;
	public pasajero;
	public pasajeroName;
	public pasajeroLastName;
	public currentScreen = 1;
	public selectedCount = 0;
	public selectedRifas = {
		totalPagar: 0, 
		rifas: Array()
	};
	public comprador = {
		compradorName : '',
		compradorLastName : '',
		compradorMail : '',
		compradorPhone : '',
		compradorDepartment : ''
	};
	public invalidForm: boolean = false;
	public invalidRifas: boolean = false;

	constructor(
		private _rifaService: RifaService,
		private _pasajeroService: PasajeroService,
		public _actionsService: ActionsService
	){
		super(_rifaService, _actionsService, 'Rifas', 'Rifa');
	}

	ngOnInit(){
		this.loading = false;
		this.pasajero = JSON.parse(localStorage.getItem('identity'));
		this.pasajeroName = this.pasajero.name;
		this.pasajeroLastName = this.pasajero.lastName;

		this.getRifas();
	}

	updateRifasToPay(){
		this.selectedRifas.totalPagar = 0;
		this.selectedRifas.rifas = Array();

		this.rifas.forEach(talones => {
			let i = 1;
			let lRifa = {item: { talones: Array(), sorteoNumero: 0}, numeroRifa: ''};
			let lTalones = Array();
			let lFlag = false;
			talones.forEach(talon => {
				if(talon.selected){
					// console.log(talon);
					talon.sorteoNumero = i;
					// console.log("txt", i);
					lRifa.numeroRifa = talon.talonNumero;
					lRifa.item.talones.push(talon);
					lFlag = true;
					this.selectedRifas.totalPagar += 20;
				}
				i++;
			});
			// lRifa.talones = lTalones;
			if(lFlag){
				this.selectedRifas.rifas.push(lRifa);
			}
		});
		console.log('Rifas seleccionadas: ', this.selectedRifas);
		
		if (this.selectedRifas.rifas.length > 0) {
			return true;
		} else {
			return false;
		}

	}

	nextScreen(){
		this.invalidRifas = false;
		if (this.currentScreen == 1) {
			if(!this.updateRifasToPay()){
				this.invalidRifas = true;
				return;
			}
		}
		if(this.currentScreen < 3){
			this.currentScreen += 1;
		}

		if(this.currentScreen == 2){
			this.updateRifasToPay();
		}
	}

	selectTalon( talon ){
		if(talon.talonEstado == 'Pendiente de Pago'){
			if(talon.selected == undefined){
				talon.selected = true;
				this.selectedCount++;
			}else if(talon.selected){
				talon.selected = false;
				this.selectedCount--;
			}else if(!talon.selected){
				talon.selected = true;
				this.selectedCount++;
			}
		}
	}
	
	previousScreen(){
		if(this.currentScreen == 2){
			this.currentScreen = 1;
		}
	}

	getRifas(){
		this.loading = true;
		this._rifaService.getRifasByPasajero(this.pasajero.sub).subscribe((response:any) => {

			this.status = response.status;

			if (this.status != 'success') {
				this.status = 'error';
			}

			let item = response.data;
			console.log(item);
			if (response.status == 'success') {
				this.rifas = response.data;
				console.log("this.rifas");
				console.log(this.rifas);
			}

			this.loading = false;
		});	
	} 

	validateForm(){
		if(this.comprador.compradorName != '' && this.comprador.compradorName != undefined && this.comprador.compradorLastName != '' && this.comprador.compradorLastName != undefined && this.comprador.compradorMail != '' && this.comprador.compradorMail != undefined && this.comprador.compradorPhone != '' && this.comprador.compradorPhone != undefined){
			if(this.validateEmail( this.comprador.compradorMail )){
				return true;
			}else{
				this.errorTxt = 'Formato de contraseña inválido';
				return false;
			}
		}else{
			this.errorTxt = 'Debes completar todos los campos*';
			return false;
		}
	}

	validateEmail( mail ) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( mail )){
		  return true;
		}
		
		return false;
	}

	generateLink(){
		if(this.validateForm()){
			this.loading = true;
			this.invalidForm = false;
			let lItipasId = this.pasajero.sub;
			let lCompradorName = this.comprador.compradorName;
			let lCompradorLastName = this.comprador.compradorLastName;
			let lCompradorMail = this.comprador.compradorMail;
			let lCompradorPhone = this.comprador.compradorPhone;
			let lCompradorDepartment = this.comprador.compradorDepartment;
			let lTalones = Array();
			let lStatus = 'Pendiente de pago';
	
			this.selectedRifas.rifas.forEach(rif => {
				rif.item.talones.forEach(tal => {
					lTalones.push(tal.talonId);
				});
			});
			
			let request = {
				itipasId : lItipasId,
				compradorName : lCompradorName,
				compradorLastName : lCompradorLastName,
				compradorMail : lCompradorMail,
				compradorPhone : lCompradorPhone,
				compradorDepartment : lCompradorDepartment,
				talones : lTalones,
				status : lStatus
			};
	
			this._rifaService.getLinkPago( request ).subscribe((response:any) => {
	
				this.status = response.status;
	
				if (this.status != 'success') {
					this.status = 'error';
				}
	
				let item = response.data;
				console.log(item);
				if (response.status == 'success') {
					alert(item);
					this.currentScreen = 3;
					this.loading = false;
				}
			});
		}else{
			this.invalidForm = true;
		}
	}
	
	volverAEnviar() {
		window.location.reload();
	}

	getTalones(){
		if(this.filterTxt != ''){
			this.loading = true;
			this._rifaService.search(this.filterTxt).subscribe((response:any) => {

				this.status = response.status;

				if (this.status != 'success') {
					this.status = 'error';
					this.router.navigate(['/dashboard/pasajeros']);
					this.openSnackBar('Ocurrió un error!', 'CERRAR');
				}



				if (this.status == 'success') {


					this.loading = false;

					this.rifas = response.data;
					// this.instance = new Itinerario(item.itinerario.itinerarioId, item.itinerario.itinerarioName, item.itinerario.viaje.viajeId, item.itinerario.itinerarioPrice, this.getHumanDatePicker(item.itinerario.itinerarioStartdate.timestamp*1000), this.getHumanDatePicker(item.itinerario.itinerarioFinishdate.timestamp*1000), lCiudades);

					// this._itinerarioService.getTramos(item.itinerario.itinerarioId).subscribe((res:any) => {
						// 	this.status = res.status;
						// 	if (this.status != 'success') {
							// 		this.tramosPropios = [];
							// 		this.tramosPropiosCollection = [];

							// 		this.status = 'error';
							// 		// this.router.navigate(['/dashboard/itinerarios']);
							// 		// this.openSnackBar('Ocurrió un error!', 'CERRAR');
							// 	}else{
								// 		this.tramosPropios = res.data;
								// 		this.tramosPropiosCollection = res.data;

								// 	this.loading = false;
								// 		this.loaderBar = false;
								// 	}
								// });
				}
			});
		}
	}
}