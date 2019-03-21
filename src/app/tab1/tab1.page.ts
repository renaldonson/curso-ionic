import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AnimalesService } from '../api/animales.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	list_medicos: any;

	constructor(private animales: AnimalesService, 
				private navCtrl: NavController,
				private storage: Storage){

	}

	medicos(id){
		console.log("Para moverme de pagina");
		let converToString = JSON.stringify(id);
		
		this.storage.set('id', converToString);
		
		this.navCtrl.navigateForward(['/medicos',{ queryParams:id}]);

	}

	ngOnInit(){
		this.animales.getMedicosList().subscribe(data=>{
			console.log(data);
			this.list_medicos = data.medicos;

		});
	}



}
