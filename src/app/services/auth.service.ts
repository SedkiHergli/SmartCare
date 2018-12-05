import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
 
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  //Verify Token
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
 
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
          this.storage.remove(REFRESH_TOKEN_KEY);
        }
      }
    });
  }


 //register User
  register(credentials) {
    return this.http.post(`${this.url}/users`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }


 //register Supervisor
  registerS(credentials) {
    return this.http.post(`${this.url}/supers`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

//register locations
  registerL(credentials) {
    return this.http.post(`${this.url}/Locations`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  //register emergencys
  registerE(credentials) {
    return this.http.post(`${this.url}/Emergencys`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  //register sensors
  registerSe(credentials) {
    return this.http.post(`${this.url}/Sensors`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

//login User
  login(credentials) {
    return this.http.post(`${this.url}/auth`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['accessToken']);
          this.storage.set(REFRESH_TOKEN_KEY, res['refresh_token']);
          this.user = this.helper.decodeToken(res['accessToken']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }

 //login Supervisor
  loginS(credentials) {
    return this.http.post(`${this.url}/auths`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['accessToken']);
          this.storage.set(REFRESH_TOKEN_KEY, res['refresh_token']);
          this.user = this.helper.decodeToken(res['accessToken']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }

//logout All users type
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(REFRESH_TOKEN_KEY);
      this.authenticationState.next(false);
    });
  }
 
//get data without authorisation
  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }
 

  //verify session 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  //show alert
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}