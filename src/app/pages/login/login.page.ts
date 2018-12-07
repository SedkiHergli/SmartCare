import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController} from '@ionic/angular';
import { Geolocation,GeolocationOptions } from '@ionic-native/geolocation/ngx';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
 
  credentialsForm: FormGroup;
  checkfemale: boolean;
  checkmale: boolean;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navContrl: NavController, public loadingController: LoadingController, public geo: Geolocation) { }
 
  ngOnInit() {
    this.getLocation();
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getLocation(){
    this.geo.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then( pos => {
      console.log(pos.coords.latitude);
     console.log(pos.coords.longitude);
    }).catch( err => console.log(err));
  }
 
  onSubmit() {
    this.presentLoadingWithOptions();
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  registerP() {
    this.navContrl.navigateRoot('/tabs');
  }
  
  updateCheckmale(val){
    if(val.detail.checked && !this.checkmale){
      this.checkfemale=false;
      this.checkmale=true;
    }
  }

  updateCheckfemale(val){
    if(val.detail.checked && !this.checkfemale){
      this.checkmale=false;
      this.checkfemale=true;
    }
  }
 
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }


}