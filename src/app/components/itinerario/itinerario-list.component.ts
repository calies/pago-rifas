import { Component, OnInit } from '@angular/core';

import { ItinerarioService } 	from "../../services/itinerario.service";
import { Sort } 				from '@angular/material';
import { ActionsService } 		from "../../services/actions.service";
import { Common } 				from './../common';

@Component({
	selector: 'itinerario-list',
	templateUrl: '../../views/itinerario-list.html'
})

export class ItinerariosComponent extends Common implements OnInit{
	constructor(
		private _itinerarioService: ItinerarioService,
		public _actionsService: ActionsService
	){
		super(_itinerarioService, _actionsService, 'Itinerarios', 'Itinerarios');
	}

	ngOnInit(){
		this.getAll();
	}

	sortData(sort: Sort) {
	    this.applyFilter();

	    const data = this.finalData.slice();
	    if (!sort.active || sort.direction == '') {
	      	this.sortedData = data;
	      	return;
	    }

	    this.sortedData = data.sort((a, b) => {
	      	let isAsc = sort.direction == 'asc';

	      	switch (sort.active) {
		        case 'itinerarioId': return this.compare(a.itinerarioId, b.itinerarioId, isAsc);
		        case 'viajeName': return this.compare(a.viaje.viajeName, b.viaje.viajeName, isAsc);
		        case 'itinerarioName': return this.compare(a.itinerarioName, b.itinerarioName, isAsc);
		        case 'itinerarioPrice': return this.compare(a.itinerarioPrice, b.itinerarioPrice, isAsc);
		        case 'itinerarioStartDate': return this.compare(a.itinerarioStartdate.timestamp, b.itinerarioStartdate.timestamp, isAsc);
		        case 'itinerarioFinishDate': return this.compare(a.itinerarioFinishdate.timestamp, b.itinerarioFinishdate.timestamp, isAsc);
		        case 'itinerarioSubgrupo': return this.compare(a.itinerarioSubgrupo, b.itinerarioSubgrupo, isAsc);
		        case 'itinerarioPublico': return this.compare(a.itinerarioPublico, b.itinerarioPublico, isAsc);
		        default: return 0;
	      	}
	    });

	    this.getFinalData();
  	}
}