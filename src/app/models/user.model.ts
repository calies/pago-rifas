export class User{
	constructor(
		public user_id:number,
		public user_name:string,
		public role_id:number,
		public user_email:string,
		public user_password:string = null
	){}
}