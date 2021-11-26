import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/_models/role';
import { User } from 'src/app/_models/user';
import { LoginService } from 'src/app/_services/login.service';
import { UsuariosService } from 'src/app/_services/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  loading = false;
  user: User;
  userFromApi!: User;
  constructor(
    private userService: UsuariosService,
    private authenticationService: LoginService
  ) {
    this.user = this.authenticationService.userValue;
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }
  ngOnInit(): void {
    this.loading = true;
    this.userService
      .getById(Number(this.user.id))
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });

    if (this.user.role === 'User') {
      console.log("buscar embarques");
    }
  }
}
