import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AnimalesService } from '../api/animales.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
declare var google: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
})
export class MedicosPage implements OnInit {
    @ViewChild('Map') mapElement: ElementRef;
    map: any;
    mapOptions: any;
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = 'AIzaSyC_QGiBvsA6chPp8KSCnNCgl2XQX0UYXGo'; /*Your API Key*/
    location: any;

	getValue: any;
	id: any;
	sub:any;
	medico:any;

  constructor( private animales: AnimalesService,
  			   public route: ActivatedRoute,
  			   public zone: NgZone, 
  			   private storage: Storage,
  			   public geolocation: Geolocation) 
  {

// AQUI ESTA EL PARAMETRO QUE LLEGA POR EL STORAGE -----------------------------
  	  this.storage.get('id').then((val) => {
  	  	console.log("AQUI HAY COSAS CURADAS");
	    console.log(val);
	  });

// AQUI ESTA EL PARAMETRO QUE LLEGA DE LA OTRA PAGINA -----------------------------
  	this.sub = this.route.params.subscribe(params => {
  		console.log(params.queryParams);
       	this.id = params.queryParams; 
       	this.getInfo();
  	});
// --------------------------------------------------------------------------------
	    /*load google map script dynamically */

  }

  ngOnInit() {
  }

  getInfo(){
	this.animales.getMedico(this.id).subscribe(data=>{
		console.log("AQUI ADENTRO");
		this.medico = data;
		console.log(data);

		this.location = {lat: data.latitud, lng: data.longitud};

      const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=';
      }
      document.head.appendChild(script);

      /*Get Current location*/
      // this.geolocation.getCurrentPosition().then((position) =>  {
      //     // this.location.lat = position.coords.latitude;
      //     // this.location.lng = position.coords.longitude;

      //     this.location.lat = "29";
      //     this.location.lng = "-110";
      // });

      /*Map options*/
      this.mapOptions = {
          center: this.location,
          zoom: 15,
          mapTypeControl: false
      };
      setTimeout(() => {
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
          /*Marker Options*/
          this.markerOptions.position = this.location;
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'My Location';
          this.marker = new google.maps.Marker(this.markerOptions);
      }, 3000);
	});
  }

}
