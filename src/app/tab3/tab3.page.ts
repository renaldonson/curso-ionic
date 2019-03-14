import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page {
    @ViewChild('Map') mapElement: ElementRef;
    map: any;
    mapOptions: any;
    location = {lat: 29.1156598, lng: -110.9702518};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    apiKey: any = 'AIzaSyC_QGiBvsA6chPp8KSCnNCgl2XQX0UYXGo'; /*Your API Key*/

  	constructor(public zone: NgZone, public geolocation: Geolocation) {
    /*load google map script dynamically */
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
  }

}
