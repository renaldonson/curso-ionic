import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http'
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  constructor(private httpclient: HttpClient, private http: HTTP) {

  }


  getAnimals(){
    return this.httpclient.get("http://demo0253989.mockable.io/curso-ionic-list");

  }

  getMedicosList(){
  	return this.httpclient.get("http://demo0253989.mockable.io/medicos");
  }

  getMedico(id){
  	return this.httpclient.get("http://demo0253989.mockable.io/medicos/" + id);
  }
}
