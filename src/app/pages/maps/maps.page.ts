import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/location'
import { interval, Subscription } from 'rxjs';



declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public distanceView="Loading ...";
  subscription: Subscription;
  token:any;
  user:any;

  constructor(private locationService: LocationService, private storage: Storage, private geolocation: Geolocation, private plt: Platform) { }

  ngOnInit() {
    if(!this.token){
      this.storage.get("access_token").then(tokenn => {
        this.token=tokenn;
        if(!this.user){
          this.storage.get("User").then(userr => {
            this.user=userr;
    this.ionViewDidLoad();
    this.startNavigating();
    const source = interval(20000);
    this.subscription = source.subscribe(val => {this.startNavigating();
    });
  });}
});
  }
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewDidLoad() {
    this.plt.ready().then(() => { 
      let mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
  startNavigating(){  
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
      this.geolocation.getCurrentPosition().then(pos => {
        directionsDisplay.setMap(this.map);
        this.locationService.getApiLocation(this.user.email_u,this.token).subscribe(posu=>{
        directionsService.route({
        origin: {lat:pos.coords.latitude, lng:pos.coords.longitude},
        destination: {lat: Number(posu[0].lat), lng: Number(posu[0].lng)},
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {
          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
              //this.storage.set("distance_m", res.routes[0].legs[0].distance.value);
          } else {
              console.warn(status);
          }

    });
  });});


} 

}
