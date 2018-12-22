import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
import { interval, Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather';
import { LocationService } from '../../services/location.service';
import { DatePipe, formatDate } from '@angular/common'
import { EmergencyService } from '../../services/emergency.service';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';



declare var google;



@Component({
  selector: 'app-accountus',
  templateUrl: './accountus.page.html',
  styleUrls: ['./accountus.page.scss'],
})
export class AccountusPage implements OnInit {
  status:any="OK !";
  statusIcon:any="assets/imgs/oki.png";
  user:any;
  token:any;
  subscription: Subscription;
  disconnectSubscription:any;
  weather:Weather={
    city:'',
    lastUp:'',
    description:'Loading ...',
    humidity:'Loading ...',
    temperature:'Loading ...',
    sunSet:'',
    sunRise:'',
    icon:''
  };


  constructor(
    private alertController: AlertController,
    private navContrl: NavController,
    private emergencyService: EmergencyService,
    private locationService: LocationService, 
    private weatherService:WeatherService, 
    private authService: AuthService, 
    private storage:Storage,
    private network: Network,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.verifyConnection();
    if(!this.token){
      this.storage.get("access_token").then(tokenn => {
        this.token=tokenn;
        if(!this.user){
          this.storage.get("User").then(userr => {
            this.user=userr;
            this.getEmergency();
            this.getWeather();
            const source = interval(10000);
            this.subscription = source.subscribe(val => {
            this.getWeather();
            this.getEmergency();
            });
          });}      
    });}  
    

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
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

openWeather(){
  this.navContrl.navigateRoot('/tabss/(weather:weather)');
}
goMap(){
  this.navContrl.navigateRoot('/tabss/(maps:maps)');
}

getEmergency(){
  this.emergencyService.getApiEmergency(this.user.email_u,this.token).subscribe(result=>{
    if(result[0].status === "ALERTS"){
      this.status=this.user.name_u + " loses stability !";
      this.statusIcon="assets/imgs/alert.png";
    }else if (result[0].status === "ALERTN") {
      this.status=this.user.name_u + " need your help !";
      this.statusIcon="assets/imgs/alert.png"; 
    } else if (result[0].status === "ALERTB") {
      this.status=this.user.name_u + " is losing energy !";
      this.statusIcon="assets/imgs/alert.png"; 
    }else{
      this.status="OK !";
      this.statusIcon="assets/imgs/oki.png"; 
    }
  });
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
