import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather';
import { DatePipe, formatDate } from '@angular/common'


@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.page.html',
  styleUrls: ['./weathers.page.scss'],
})
export class WeathersPage implements OnInit {

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

  constructor(private locationService:LocationService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather(){
    this.locationService.getLocation().then(loc=>{
      this.weatherService.getWeather(loc).subscribe(resp=>{
        this.weather.city ='You are at ' + resp.name + ', ' + resp.sys.country;
        this.weather.description = resp.weather[0].description;
        this.weather.icon ='http://openweathermap.org/img/w/'+resp.weather[0].icon+'.png';
        this.weather.humidity = 'Humidity: ' + resp.main.humidity + ' %';
        this.weather.temperature = 'Temperature: ' + resp.main.temp + ' °C';
        var datePipe = new DatePipe("en-US");
        this.weather.sunRise = 'Sunrise: ' + String(datePipe.transform((resp.sys.sunrise*1000),"hh:mm a"));
        this.weather.sunSet = 'Sunset: ' + String(datePipe.transform((resp.sys.sunset*1000),"hh:mm a"));
        var today= new Date();
        this.weather.lastUp='Last Updated: '+String(formatDate(today, 'dd-MM-yyyy hh:mm a', 'en-US'));
      });
    });
  
  }

}
