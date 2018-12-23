import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { SensorService } from '../../services/sensor.service';
import { Storage } from '@ionic/storage';
import { interval, Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather';
import { LocationService } from '../../services/location.service';
import { DatePipe, formatDate } from '@angular/common'
import { EmergencyService } from '../../services/emergency.service';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { MotionService } from '../../services/motion.service';
import { Network } from '@ionic-native/network/ngx';


declare var google;
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';



@Component({
  selector: 'app-accountu',
  templateUrl: './accountu.page.html',
  styleUrls: ['./accountu.page.scss'],
})
export class AccountuPage implements OnInit {
  status:any="Ok !";
  stat:any="Ok";
  statusIcon:any="assets/imgs/oki.png";
  user:any;
  token:any;
  temp:any="Loading ...";
  humidity:any="Loading ...";
  batt_level:any;
  current:any;
  voltage:any;
  min_v:any;
  max_v:any;
  mAH:any;
  sub:any;
  disconnectSubscription:any;
  batt_restTime:any;
  home_restTime:any;
  subscription: Subscription;
  subscriptionn: Subscription;
  weather:Weather={
    city:'',
    lastUp:'',
    description:'Loading ...',
    humidity:'',
    temperature:'',
    sunSet:'',
    sunRise:'',
    icon:''
  };


  constructor(
    private motionService: MotionService, 
    private alertController: AlertController, 
    private navContrl: NavController,
    private emergencyService: EmergencyService,
    private locationService: LocationService, 
    private weatherService:WeatherService, 
    private authService: AuthService, 
    private sensorService: SensorService, 
    private storage:Storage,
    private network: Network,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.verifyConnection();
    const sourcee = interval(3599000);
    this.subscriptionn = sourcee.subscribe(val => {
      this.storage.get(REFRESH_TOKEN_KEY).then(tokeni => {
        this.storage.get(TOKEN_KEY).then(tokenn => {
        this.authService.updateToken("auth",tokeni,tokenn).subscribe(resp=>{
          this.storage.set(TOKEN_KEY,resp["access_token"]);
        });
      });});      
      });

    this.watchStability();
    if(!this.token){
      this.storage.get("access_token").then(tokenn => {
        this.token=tokenn;
        if(!this.user){
          this.storage.get("User").then(userr => {
            this.user=userr;
            this.getSensorData();
            this.getWeather();
            this.startNavigating();
            const source = interval(10000);
            this.subscription = source.subscribe(val => {
            if(this.motionService.alert){
              this.statusIcon="assets/imgs/alert.png";
              this.status="ALERT !";
              this.stat="ALERTS"
            }
            this.getSensorData();
            this.getWeather();
            this.startNavigating();
            });
          });}      
    });}  
    

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.sub.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

  verifyConnection(){
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast("Please turn on your connection !");
    });
  }

  logout() {
    this.authService.logout();
  }

  getSensorData(){
        this.sensorService.getApiSensor(this.user.email,this.token).subscribe(res=>{
          this.humidity=res[0].humidity;
          this.temp=res[0].temperature;
          this.voltage=res[0].voltage;
          this.current=res[0].current;
          this.max_v=res[0].max_v;
          this.min_v=res[0].min_v;
          this.mAH=res[0].battery_mah;
          this.batt_level=Number(((Number(this.voltage)-Number(this.min_v))/(Number(this.max_v)-Number(this.min_v)))*100);
          this.storage.get("distance_m").then(dist=>{
            this.home_restTime = (Number(dist)/1000)/6.3;
            this.batt_restTime = this.mAH * (this.batt_level / 100) / (Number(this.current)*1000);
            if(this.batt_restTime<=this.home_restTime){
              this.emergencyService.updateEmergency({"status":"ALERTB"},this.user.email,this.token).subscribe();
              this.status="ALERT !";
              this.stat="ALERTB";
              this.statusIcon="assets/imgs/alert.png";
            }
            else{
              if(this.stat==="ALERTB"){
                this.status="OK !";
                this.stat="OK";
                this.statusIcon="assets/imgs/oki.png";
              }
            }
          });      
        });
  }
  
  getWeather(){
  this.locationService.getLocation().then(loc=>{
    this.weatherService.getWeather(loc).subscribe(resp=>{
      this.weather.city ='You are at ' + resp.name + ', ' + resp.sys.country;
      this.weather.description = resp.weather[0].description;
      this.weather.icon ='http://openweathermap.org/img/w/'+resp.weather[0].icon+'.png';
      this.weather.humidity = resp.main.humidity + ' %';
      this.weather.temperature = resp.main.temp + ' °C';
      var datePipe = new DatePipe("en-US");
      this.weather.sunRise = datePipe.transform((resp.sys.sunrise*1000),"hh:mm a");
      this.weather.sunSet = datePipe.transform((resp.sys.sunset*1000),"hh:mm a");
      var today= new Date();
      this.weather.lastUp=formatDate(today, 'dd-MM-yyyy hh:mm a', 'en-US');
    });
  });
}

startNavigating(){  
  let directionsService = new google.maps.DirectionsService;
  this.storage.get("User").then(user => {
    this.locationService.getLocation().then(pos => {
      directionsService.route({
      origin: {lat:pos.lat, lng:pos.lng},
      destination: {lat: Number(user.lat), lng: Number(user.lng)},
        travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
        if(status == google.maps.DirectionsStatus.OK){
            this.storage.set("distance_m", res.routes[0].legs[0].distance.value);
        } else {
            console.warn(status);
        }

  });
});
});
} 

openWeather(){
  this.navContrl.navigateRoot('/tabs/(weather:weather)');
}


async AlertChangeStatutsOk() {
  const alert = await this.alertController.create({
    header: 'Modify User',
    message:'Are you sure about decline the alert !',
    buttons: [
      {
        text: 'CANCEL',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'OK',
        handler: (data) => {
          this.storage.get("access_token").then(tokenn => {
            this.token=tokenn;
              this.storage.get("User").then(userr => {
                this.emergencyService.updateEmergency({"status":"OK"},this.user.email,this.token).subscribe();
                this.statusIcon="assets/imgs/oki.png";
                this.status="Ok !"
                this.stat="OK";
                this.motionService.alert=false;
              });
            });
        }
      }
    ]
  });

  await alert.present();
}

async AlertChangeStatuts() {
  const alert = await this.alertController.create({
    header: 'Modify User',
    message:'Are you sure about sending to supervisor help request !',
    buttons: [
      {
        text: 'CANCEL',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'OK',
        handler: (data) => {
          this.storage.get("access_token").then(tokenn => {
            this.token=tokenn;
              this.storage.get("User").then(userr => {
                this.emergencyService.updateEmergency({"status":"ALERTN"},this.user.email,this.token).subscribe();
                this.statusIcon="assets/imgs/alert.png";
                this.status="ALERT !";
                
              });
            });
        }
      }
    ]
  });

  await alert.present();
}

watchStability(){
  this.sub = this.motionService.getMotion();
  if(this.motionService.alert){
    this.statusIcon="assets/imgs/alert.png";
    this.status="ALERT !";
  }
}

presentToast(m) {
  let toast = this.toastCtrl.create({
    message: m,
    duration: 1500,
    position: 'bottom'
  });
  toast.then(res=>res.present());
}

}
