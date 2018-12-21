import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { SensorService } from '../../services/sensor.service';
import { Storage } from '@ionic/storage';
import { interval, Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather';
import { LocationService } from '../../services/location.service';
import { DatePipe, formatDate } from '@angular/common'



@Component({
  selector: 'app-accountu',
  templateUrl: './accountu.page.html',
  styleUrls: ['./accountu.page.scss'],
})
export class AccountuPage implements OnInit {
  status:any="Ok";
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
  subscription: Subscription;
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


  constructor(private locationService: LocationService, private weatherService:WeatherService, private authService: AuthService, private sensorService: SensorService, private storage:Storage) { }

  ngOnInit() {
    this.getSensorData();
    const source = interval(10000);
    this.subscription = source.subscribe(val => {
      this.getSensorData();
    });
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  logout() {
    this.authService.logout();
  }
  getSensorData(){
    this.storage.get("refresh_token").then(tokenn => {
      this.token=tokenn;
      this.storage.get("User").then(userr => {
        this.user=userr;
        this.sensorService.getApiSensor(this.user.email,this.token).subscribe(res=>{
          this.humidity=res[0].humidity;
          this.temp=res[0].temperature;
          this.voltage=res[0].voltage;
          this.current=res[0].current;
          this.max_v=res[0].max_v;
          this.min_v=res[0].min_v;
          this.mAH=res[0].battery_mah;
          this.batt_level=Number((Number(this.max_v)-Number(this.voltage))/(Number(this.max_v)-Number(this.min_v))*100);
          this.status = "Ok !"
          
        });
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
}
