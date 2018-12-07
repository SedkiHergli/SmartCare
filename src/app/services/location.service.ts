import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(public geo: Geolocation) { }

  getLocation(){
    var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    return this.geo.getCurrentPosition(options).then( pos => {
      var result ={"lat":pos.coords.latitude,"lng":pos.coords.longitude};
      return result;
    });
  }
}
