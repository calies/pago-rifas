export class Deposito{
	constructor(
		public deposito_id:number,
		public deposito_monto:number,
		public deposito_tipo:string,
		public deposito_fecha:string,
		public deposito_fechaProcesado:string,
		public itinerarioPasajero_id:number,
		public deposito_csv:number,
		public tarjeta_terminal: string,
		public tarjeta_issuer: string,
		public tarjeta_moneda: string,
		public tarjeta_cuotas: number,
		public tarjeta_fechaTransaccion: string,
		public tarjeta_lote: string,
		public tarjeta_ticket: string,
		public tarjeta_codigoAutorizacion: string,
		public tarjeta_plan: string,
		public tarjeta_documento: string,
		public tarjeta_numeroTarjeta: string,
		public tarjeta_nombreTarjeta: string,
		public tarjeta_acquirer: string,
		public tarjeta_comercio: string,
		public tarjeta_liquidada: boolean,
		public tarjeta_fechaLiquidada: string,
		public deposito_comentario:string,
		public deposito_crearPagoPersonal:boolean
	){}
}	