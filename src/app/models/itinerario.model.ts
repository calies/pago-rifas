export class Itinerario{
	constructor(
		public itinerario_id:number,
		public itinerario_name:string,
		public viaje_id:number,
		public itinerario_price:number,
		public itinerario_startDate:string,
		public itinerario_finishDate:string,
		public itinerario_ciudades:any,
		public itinerario_subgrupo:any,
		public itinerario_publico:any
	){}
}