import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController} from '@ionic/angular';
import { LocationService } from '../../services/location.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
 
  credentialsForm: FormGroup;
  checkfemale: boolean;
  checkmale: boolean;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private navContrl: NavController, public loadingController: LoadingController, public locationService: LocationService) { }
 
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
        console.log(pos);
      }).catch((err)=>console.log(err));
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