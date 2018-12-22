import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tabss',
  templateUrl: './tabss.component.html',
  styleUrls: ['./tabss.component.scss']
})
export class TabssComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
  tab2Selected() {
    console.log('My tab was selected!');
  }

  logout() {
    this.authService.logout();
  }

}
