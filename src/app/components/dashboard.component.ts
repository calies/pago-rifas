import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'dashboard',
	templateUrl: '../views/dashboard.html'
})

export class DashboardComponent implements OnInit{
	public showMenu: boolean = false;
	public menuPublicItems = [];
	public menuItems = [
		{
			'name':'Aeropuertos',
			'link':'./aeropuertos',
			'access': []
		},
		{
			'name':'Ciudades',
			'link':'./ciudades',
			'access': []
		},
		{
			'name':'Depositos',
			'link':'./depositos',
			'access': []
		},
		{
			'name':'Itinerarios',
			'link':'./itinerarios',
			'access': []
		},
		{
			'name':'Paises',
			'link':'./paises',
			'access': []
		},
		{
			'name':'Pasajeros',
			'link':'./pasajeros',
			'access': []
		},
		{
			'name':'Proveedores',
			'link':'./proveedores',
			'access': []
		},
		{
			'name':'Puntos de Interés',
			'link':'./puntos-interes',
			'access': []
		},
		{
			'name':'Tramos',
			'link':'./tramos',
			'access': []
		},
		{
			'name':'Rifas',
			'link':'./rifas',
			'access': []
		},
		{
			'name':'Viajes Madre',
			'link':'./viajes-madre',
			'access': []
		},
		{
			'name':'Viajes',
			'link':'./viajes',
			'access': []
		},
		{
			'name':'Servicios',
			'link':'./servicios',
			'access': []
		}
		/*{
			'name':'Tipos de servicio',
			'link':'./tipos-servicio',
			'access': []
		},*/
		
		
		
		
		
		
		

		/*,
		{
			'name':'Proyectos',
			'link':'./projects',
			'access': [1, 2, 10]
		},
		{
			'name':'Usuarios',
			'link':'./users',
			'access': [1]
		},
		{
			'name':'Roles',
			'link':'./roles',
			'access': [1]
		},
		{
			'name':'Departamentos',
			'link':'./departments',
			'access': [1]
		},
		{
			'name':'Horas',
			'link':'./hours',
			'access': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		},
		{
			'name':'Reportes',
			'link':'./reports',
			'access': [1, 2, 10]
		},
		{
			'name':'Configuración',
			'link':'./settings',
			'access': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		}*/
	];

	constructor(
		private _authService: AuthService) {
	}

	ngOnInit(){
    	for (let i = 0; i < this.menuItems.length; i++) {
	    	//if(this.menuItems[i].access.length == 0 || this.showItem(this.menuItems[i].access)){
	    		this.menuPublicItems.push(this.menuItems[i]);
	    	//}
    	}
	}

	/*showItem(pRoles){
    	let hasRole = false;
		hasRole = this._authService.hasRole(pRoles);
    	return hasRole;
	}*/

	toggleMenu(){
		if (this.showMenu) {
			this.showMenu = false;
		}else{
			this.showMenu = true;
		}
	}

	logout(){
		this._authService.logout();
	}

}


