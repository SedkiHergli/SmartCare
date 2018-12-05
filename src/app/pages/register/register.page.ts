import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  checkfemale: boolean;
  checkmale: boolean;
  sexe: string;
  requet_s:object;
  requet_se:object;
  requet_e:object;
  requet_l:object;
  checkAddSuper:boolean;


  constructor(public loadingController: LoadingController, private formBuilder: FormBuilder, private authService: AuthService, public alertController: AlertController, private navContrl: NavController) { 
    this.checkAddSuper=true;
    this.requet_s={};
    this.requet_se={};
    this.requet_e={};
    this.requet_l={};
  }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginP() {
    this.navContrl.navigateRoot('/login');
  }

  register() {
    this.presentLoadingWithOptions();
    if(this.checkmale){
      this.sexe="Male";
    }else{this.sexe="Male";}
    var request = {
    "fullName": this.credentialsForm.value.fullName,
    "email": this.credentialsForm.value.email,
    "password": this.credentialsForm.value.password,
    "phone":this.credentialsForm.value.phone,
    "sexe":this.sexe,
    "stype":"User",
    "lat":"{type:String,required:true}",
    "lng":"{type:String,required:true}",
    "name_s":this.requet_s["fullName"],
    "email_s":this.requet_s["email"],
    "phone_s":this.requet_s["phone"]
    };

    this.requet_s["stype"]="Supervisor";
    this.requet_s["name_u"]=request.fullName;
    this.requet_s["email_u"]=request.email;
    this.requet_s["phone_u"]=request.phone;
    this.requet_l["email"]=request.email;
    this.requet_l["lat"]=request.lat;
    this.requet_l["lng"]=request.lng;
    this.requet_e["email"]=request.email;
    this.requet_e["status"]="OK";
    this.requet_se["email"]=request.email;
    this.requet_se["humidity"]="50 %";
    this.requet_se["temperature"]="25 °C";
    this.requet_se["current"]="0.01";
    this.requet_se["voltage"]="4";
    this.requet_se["battery_mah"]="3000";
    this.requet_se["max_v"]="9";
    this.requet_se["min_v"]="7";

    

   this.authService.register(request).subscribe(res => {
      this.authService.registerS(this.requet_s).subscribe();
      this.authService.registerSe(this.requet_se).subscribe();
      this.authService.registerE(this.requet_e).subscribe();
      this.authService.registerL(this.requet_l).subscribe();
      this.authService.login(this.credentialsForm.value).subscribe();
    });
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

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Supervisor',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: 'fullName'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'SAVE',
          handler: (data) => {
            this.requet_s = data;
            if(!data["fullName"] || !data["email"] || !data["phone"] || !data["password"])
            {
              this.showAlert("You should complete input Supervisor fields!");
            }
              else{this.checkAddSuper=false;}
          }
        }
      ]
    });

    await alert.present();
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
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
