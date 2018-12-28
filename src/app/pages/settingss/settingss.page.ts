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
  selector: 'app-settingss',
  templateUrl: './settingss.page.html',
  styleUrls: ['./settingss.page.scss'],
})
export class SettingssPage implements OnInit {
  user:any;
  token:any;
  datan:any={};

  constructor(private toastCtrl: ToastController, private authService: AuthService,public alertController: AlertController, public storage:Storage,private userService:UserService,private emergencyService:EmergencyService,private locationService:LocationService,private sensorService:SensorService,private supervisorService:SupervisorService) { }

  ngOnInit() {
    this.storage.get("User").then(userr => {this.user=userr;});
    this.storage.get("access_token").then(tokenn => {this.token=tokenn;});
  }


  async ChangeAccountS() {
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
          datta["name_s"]=this.datan.fullName;
          datta["email_s"]=this.datan.email;
          datta["phone_s"]=this.datan.phone;
          this.userService.updateUser(datta,this.user.email_u,this.token).subscribe((res)=>{
                  this.supervisorService.updateSupervisor(this.datan,this.user.email,this.token).subscribe((res)=>{
                    this.logout();
                  });
                });  
          }
        }
      ]
    });

    await alert.present();
  }

  async ChangePasswordS() {
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
              this.supervisorService.updateSupervisor(data,this.user.email,this.token).subscribe((res)=>this.logout());   
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

  presentToast(m) {
  let toast = this.toastCtrl.create({
    message: m,
    duration: 1500,
    position: 'bottom'
  });
  toast.then(res=>res.present());
}


}
