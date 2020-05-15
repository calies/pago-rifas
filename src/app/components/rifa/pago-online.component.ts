// tslint:disable: indent
import { Component, OnInit }	from '@angular/core';
import { ActivatedRoute }	from '@angular/router';

import { RifaService }	from '../../services/rifa.service';
import { PasajeroService }	from '../../services/pasajero.service';
import { GeoPayService }	from '../../services/geopay.service';
import { ActionsService }	from '../../services/actions.service';
import { Common }	from './../common';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
	selector: 'pago-online',
	templateUrl: '../../views/pago-online.html'
})

export class PagoOnlineComponent extends Common implements OnInit{
	public filterTxt = '';
	public rifas: any;
	public pasajero;
	public pasajeroName = '';
	public pasajeroLastname = '';
	public comprador = {
		name: '',
		lastName: '',
		email: '',
		phone: '',
		department: ''
	};
	public token;
	public department: string = '';
	public ventaId: number;
	public currentScreen: number = 1;
	public totalPagar: number = 0;
	public invalidForm: boolean = false;
	public errorTxt:string = '';
	public loadingGeopay: boolean = false;
	
	constructor(
		private _rifaService: RifaService,
		private _pasajeroService: PasajeroService,
		private _geoPayService: GeoPayService,
		private route: ActivatedRoute,
		public _actionsService: ActionsService
	){
		super(_rifaService, _actionsService, 'Rifas', 'Rifa');
	}

	ngOnInit(){
		this.loading = true;


		this.route.params.subscribe(params => {
			this.token = params['token'];

			if (isNaN(this.token) || this.token != undefined  || this.token != '') {
				this._rifaService.validateRifaToken(this.token).subscribe((response:any) => {
					
					this.status = response.status;

					if (this.status != 'success') {
						this.status = 'error';
						this.router.navigate(['/error']);
					}

					let item = response.data;

					if (response.status == 'success') {
						this.ventaId = item.linkData.linkpagorifaId;
						this.pasajero = item.linkData.itinerariopasajero.pasajero;
						this.pasajeroName = this.pasajero.pasajeroFirstname;
						this.pasajeroLastname = this.pasajero.pasajeroLastname;
						this.comprador = {
							name: item.linkData.linkpagorifaCompradorname,
							lastName: item.linkData.linkpagorifaCompradorlastname,
							email: item.linkData.linkpagorifaCompradoremail,
							phone: item.linkData.linkpagorifaCompradorphone,
							department: item.linkData.linkpagorifaDepartment
						};
						this.rifas = item.talones;

						item.talones.forEach(rifas => {
							rifas.forEach(talon => {
								this.totalPagar +=20;
							});
						});
						console.log('this.validation');
						console.log(response.data);
					}

					this.loading = false;
				});
			}else{
				this.router.navigate(['/error']);
			}
		});
	}

	validateForm(){
		if( this.comprador.name != '' && this.comprador.name != undefined && 
			this.comprador.lastName != '' && this.comprador.lastName != undefined && 
			this.comprador.email != '' && this.comprador.email != undefined && 
			this.comprador.phone != '' && this.comprador.phone != undefined && 
			this.comprador.department != '' && this.comprador.department != undefined && this.comprador.department != null){
			if(this.validateEmail( this.comprador.email )){
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

	initPayment(){
		this.loadingGeopay = true;
		this.loading = true;
		if(this.validateForm()){
			this.loading = true;
			this.invalidForm = false;
			let lAmount = this.totalPagar;
			let lCompradorName = this.comprador.name;
			let lCompradorLastname = this.comprador.lastName;
			let lCompradorMail = this.comprador.email;
			let lCompradorPhone = this.comprador.phone;
			let lCompradorDepartment = this.comprador.department;
			let lVentaId = this.ventaId;
			// let lTalones = [182482, 182487, 182517];
			// let lStatus = 'Pendiente de pago';
	
			// let request = {
			// 	itipasId : lItipasId,
			// 	compradorName : lCompradorName,
			// 	compradorMail : lCompradorMail,
			// 	compradorPhone : lCompradorPhone,
			// 	talones : lTalones,
			// 	status : lStatus
			// };
	
			this._geoPayService.initPayment(  this.token, lAmount, lCompradorDepartment, lCompradorMail, lCompradorName, lCompradorLastname, lCompradorPhone, lVentaId ).subscribe((response:any) => {
	
				this.status = response.status;
	
				if (this.status != 'success') {
					this.status = 'error';
				}
	
				let item = response.data;
				console.log(item);
				if (response.status == 'success') {
					var mapForm = document.createElement('form');
					mapForm.setAttribute('id', 'Div1');
					mapForm.target = '_self';
					mapForm.method = 'POST'; // or "post" if appropriate
					mapForm.action = 'https://geopaytest.geocom.com.uy:9443/geopay-ui/services/payments/requestPayment';
					// Object.keys(['token':item.token]).forEach(function(param){
					var mapInput = document.createElement('input');
					mapInput.type = 'hidden';
					mapInput.name = 'token';
					mapInput.setAttribute('value', item.token);
					mapForm.appendChild(mapInput);
					// });
					// alert(1);
					document.body.appendChild(mapForm);
					jQuery('#Div1').submit();
						// if ( $( "input" ).first().val() === "correct" ) {
							// $( "span" ).text( "Validated..." ).show();
							// return;
						// }
						
					// 	alert(2);
					// 	console.log('event');
					// 	console.log(event);

					// 	// $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
					// 	// event.preventDefault();
					// });

					// let testFetch = fetch('https://geopaytest.geocom.com.uy:9443/geopay-ui/services/payments/requestPayment', {mode: 'no-cors', method: "POST", body: JSON.stringify({token: item.token}), headers: {
    				// 		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  					// 	}})
					// .then( data => { console.log('data1', data)})
					// .catch( data => { console.log('data2', data)});

					// Promise.all([testFetch]).then(res => {
					// 	console.log(res);
					// })
					// .catch(err => {
    				// 	console.error(err);
  					// })
					// $.ajax({
					// 	url : 'https://geopaytest.geocom.com.uy:9443/geopay-ui/services/payments/requestPayment', // or whatever
					// 	method: "POST",
					// 	crossDomain: true,
					// 	crossOrigin: true,
   					// 	dataType: 'jsonp',
					// 	headers: {
    				// 		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  					// 	},
					// 	// dataType : 'json',
					// 	data: JSON.stringify({token: item.token}),
					// 	success : function (response) {
					// 		console.log("The server says:", response);
					// 	}
					// });
				}
			});
		}else{
			this.invalidForm = true;
		}
		
		this.loading = false;
	}
}