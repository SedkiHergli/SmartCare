import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TabsModule } from './tabs/tabs.module';
import { TabssModule } from './tabss/tabss.module';
import { LocationService } from './services/location.service';
import { SensorService } from './services/sensor.service';
import { EmergencyService } from './services/emergency.service';
import { SupervisorService } from './services/supervisor.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { WeatherService } from './services/weather.service';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { MotionService } from './services/motion.service';
import { Network } from '@ionic-native/network/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';



export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['localhost:8443']
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  HttpClientModule,
  IonicStorageModule.forRoot(),
  JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory,
      deps: [Storage],
    }
  }),
  TabsModule,
  TabssModule,
],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    CallNumber,
    Network,
    MotionService,
    DeviceMotion,
    LocationService,
    AuthGuardService,
    AuthService,
    UserService,
    SupervisorService,
    SensorService,
    EmergencyService,
    WeatherService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
