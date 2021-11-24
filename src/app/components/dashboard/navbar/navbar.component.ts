import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/_models/role';
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



  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
  ngOnInit(): void {}
  logout() {
    this.loginService.logout();
  }
}
