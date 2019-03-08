import { Component } from '@angular/core';
import { AnimalesService } from '../api/animales.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {



	constructor(private animales: AnimalesService ){

	}

	ngOnInit(){
		this.animales.getAnimals().subscribe(data=>{
			console.log(data);
		});
	}

}
