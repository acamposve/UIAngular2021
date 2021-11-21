import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmbarquesComponent } from './embarques/embarques.component';
import { StatusEmbarquesComponent } from './status-embarques/status-embarques.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit.component';
import { StatusEmbarquesAddComponent } from './status-embarques/status-embarques-add.component';
import { StatusEmbarquesEditComponent } from './status-embarques/status-embarques-edit.component';




@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    UsuariosComponent,
    EmbarquesComponent,
    StatusEmbarquesComponent,
    NavbarComponent,
    UsuariosAddComponent,
    UsuariosEditComponent,
    StatusEmbarquesAddComponent,
    StatusEmbarquesEditComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
