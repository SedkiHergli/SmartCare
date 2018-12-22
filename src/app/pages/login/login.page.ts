import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController} from '@ionic/angular';
import { LocationService } from '../../services/location.service';
import { Storage } from '@ionic/storage';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  credentialsForm: FormGroup;
  checksuper: boolean;
  checkuser: boolean;
 
  constructor(private storage: Storage, private formBuilder: FormBuilder, private authService: AuthService, private navContrl: NavController, public loadingController: LoadingController, public locationService: LocationService) { }
 
  ngOnInit() {
    this.getLocation();
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getLocation(){
    this.locationService.getLocation().then(
      (pos)=>{
        this.storage.set("MyLocation", {"lat":pos.lat,"lng":pos.lng});
        console.log("delete it after");
      }).catch((err)=>console.log(err));
  }
 
  onSubmit() {
    if(this.checkuser){
    this.authService.login(this.credentialsForm.value).subscribe(resp=>this.presentLoadingWithOptions());
  }
    else if (this.checksuper) {
      this.authService.loginS(this.credentialsForm.value).subscribe(resp=>this.presentLoadingWithOptions());
    } else {
      console.log("Please choose profile type !");
    }
  }
 
  registerP() {
    this.navContrl.navigateRoot('/register');
  }
  
  updateCheckuser(val){
    if(val.detail.checked && !this.checkuser){
      this.checksuper=false;
      this.checkuser=true;
    }
  }

  updateChecksuper(val){
    if(val.detail.checked && !this.checksuper){
      this.checkuser=false;
      this.checksuper=true;
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