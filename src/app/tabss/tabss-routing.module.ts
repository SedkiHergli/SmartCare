import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabssComponent } from './tabss.component';
import { AccountusPage } from '../pages/accountus/accountus.page';
import { MapsPage } from '../pages/maps/maps.page';
import { WeathersPage } from '../pages/weathers/weathers.page';
import { SettingssPage } from '../pages/settingss/settingss.page';
import { AuthGuardService } from './../services/auth-guard.service';


const routes: Routes = [
  {
    path: 'tabss',
    component: TabssComponent,
    children: [
      {
        path: '',
        redirectTo: '/tabss/(accountus:accountus)',
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'accountus',
        outlet: 'accountus',
        component: AccountusPage,
        canActivate: [AuthGuardService],

      },
      {
        path: 'maps',
        outlet: 'maps',
        component: MapsPage,
        canActivate: [AuthGuardService],

      },
      {
        path: 'weathers',
        outlet: 'weathers',
        component: WeathersPage,
        canActivate: [AuthGuardService],

      },
      {
        path: 'settingss',
        outlet: 'settingss',
        component: SettingssPage,
        canActivate: [AuthGuardService],

      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabss/(accountus:accountus)',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabssRoutingModule { }
