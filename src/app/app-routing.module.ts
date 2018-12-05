import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'accountu', loadChildren: './pages/accountu/accountu.module#AccountuPageModule',canActivate: [AuthGuardService]},
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule',canActivate: [AuthGuardService] },
  { path: 'weather', loadChildren: './pages/weather/weather.module#WeatherPageModule',canActivate: [AuthGuardService] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule',canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
