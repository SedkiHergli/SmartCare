import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController, ToastController} from '@ionic/angular';
import { LocationService } from '../../services/location.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  credentialsForm: FormGroup;
  checksuper: boolean;
  checkuser: boolean;
  disconnectSubscription:any;
 
  constructor(
    private storage: Storage, 
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private navContrl: NavController, 
    public loadingController: LoadingController, 
    public locationService: LocationService,
    private network: Network,
    private toastCtrl: ToastController
  ) { }
 
  ngOnInit() {
    this.verifyConnection();
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy() {
    this.disconnectSubscription.unsubscribe();
  }

  verifyConnection(){
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast("Please turn on your connection !");
    });
  }
 
  onSubmit() {
    if(this.checkuser){
    this.authService.login(this.credentialsForm.value).subscribe(resp=>{
      this.presentLoadingWithOptions();
    });
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

  presentToast(m) {
    let toast = this.toastCtrl.create({
      message: m,
      duration: 1500,
      position: 'bottom'
    });
    toast.then(res=>res.present());
  }


}