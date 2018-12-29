import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent {
  public pages = [
    {title: 'My Account', url: '/tabs/(accountu:accountu)', icon:'person'},
    {title: 'Map', url: '/tabs/(map:map)', icon:'map'},
    {title: 'Today Weather', url: '/tabs/(weather:weather)', icon:'sunny'},
    {title: 'Settings', url: '/tabs/(settings:settings)', icon:'settings'}
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
  ){
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get("first").then(resp=>{
      if(!resp){ this.router.navigate(['register']);}
      else{
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.authService.accountType.subscribe(type=>{
            if(type){
              this.router.navigate(['tabss']);
            } else{
              this.router.navigate(['tabs']);
            }
          });
        } 
      
      });}
    });
    });
  }

  logout() {
    this.authService.logout();
  }
}
