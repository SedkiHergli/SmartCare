import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-accountu',
  templateUrl: './accountu.page.html',
  styleUrls: ['./accountu.page.scss'],
})
export class AccountuPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }

}
