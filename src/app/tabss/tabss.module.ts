import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabssRoutingModule } from './tabss-routing.module';
import { TabssComponent } from './tabss.component';
import { AccountusPageModule } from '../pages/accountus/accountus.module';
import { IonicModule } from '@ionic/angular';
import { MapsPageModule } from '../pages/maps/maps.module';
import { WeathersPageModule } from '../pages/weathers/weathers.module';
import { SettingssPageModule } from '../pages/settingss/settingss.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabssRoutingModule,
    AccountusPageModule,
    MapsPageModule,
    WeathersPageModule,
    SettingssPageModule
  ],  
  declarations: [TabssComponent]
})
export class TabssModule { }
