import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: User;

  constructor(private loginService: LoginService) {
    this.loginService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit(): void {}
  logout() {
    this.loginService.logout();
  }
}
