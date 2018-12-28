import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { EmergencyService } from '../../services/emergency.service';
import { LocationService } from '../../services/location.service';
import { SensorService } from '../../services/sensor.service';
import { SupervisorService } from '../../services/supervisor.service';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user:any;
  token:any;
  datan:any={};

  constructor(private toastCtrl: ToastController, private authService: AuthService,public alertController: AlertController, public storage:Storage,private userService:UserService,private emergencyService:EmergencyService,private locationService:LocationService,private sensorService:SensorService,private supervisorService:SupervisorService) { }

  ngOnInit() {
    this.storage.get("User").then(userr => {this.user=userr;});
    this.storage.get("access_token").then(tokenn => {this.token=tokenn;});
  }


  async ChangeAccountU() {
    const alert = await this.alertController.create({
      header: 'Modify User',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: this.user.fullName
        },
        {
          name: 'email',
          type: 'email',
          placeholder: this.user.email
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: this.user.phone
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
            for (let item of Object.keys(data)) {
              if(!data[item]){
                this.datan[item]=this.user[item];
              }
              else{
                this.datan[item]=data[item];
              }
            
          }   
          var datta ={};
          datta["name_u"]=this.datan.fullName;
          datta["email_u"]=this.datan.email;
          datta["phone_u"]=this.datan.phone;
          this.userService.updateUser(this.datan,this.user.email,this.token).subscribe((res)=>{
            this.locationService.updateLocation(this.datan,this.user.email,this.token).subscribe((res)=>{
              this.emergencyService.updateEmergency(this.datan,this.user.email,this.token).subscribe((res)=>{
                this.sensorService.updateSensor(this.datan,this.user.email,this.token).subscribe((res)=>{
                  this.supervisorService.updateSupervisor(datta,this.user.email_s,this.token).subscribe((res)=>{
                    this.logout();
                  });
                });
              });   
            });   
          });   
          }
        }
      ]
    });

    await alert.present();
  }

  async ChangePasswordU() {
    const alert = await this.alertController.create({
      header: 'Modify Password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        {
          name: 'cpassword',
          type: 'password',
          placeholder: 'Confirm password'
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
              if(!data["password"] || data["cpassword"]!=data["password"] || data["password"].length < 6  ){
                this.showAlert("Enter password again !!");
            }
            else{  
              this.userService.updateUser(data,this.user.email,this.token).subscribe((res)=>this.logout());   
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async ChangeSupervisorU() {
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
            if(!data["fullName"] || !data["email"] || !data["phone"] || !data["password"])
            {
              this.showAlert("You should complete input Supervisor fields!");
            }
              else{
                var datta ={};
                datta["name_s"]=data["fullName"];
                datta["email_s"]=data["email"];
                datta["phone_s"]=data["phone"];
                data["stype"]="Supervisor";
                data["name_u"]=this.user.fullName;
                data["email_u"]=this.user.email;
                data["phone_u"]=this.user.phone;
                this.supervisorService.deleteSupervisor(this.user.email_s,this.token).subscribe((res)=>{
                  this.authService.registerS(data).subscribe((res)=>{
                    this.userService.updateUser(datta,this.user.email,this.token).subscribe((res)=>{
                      this.logout();
                    });
                  });
                });
              }
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  async locationChangeConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm location change',
      message: 'To change your home location you should be at home to locate you, if you are now in home click saving!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.locationService.getLocation().then(result=>{
              this.userService.updateUser(result,this.user.email,this.token).subscribe(result=>this.presentToast("Location updated !"));
            });
          }
        }
      ]
    });
    alert.present();
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
