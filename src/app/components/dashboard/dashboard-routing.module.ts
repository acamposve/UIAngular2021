import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmbarquesComponent } from './embarques/embarques.component';
import { InicioComponent } from './inicio/inicio.component';
import { StatusEmbarquesComponent } from './status-embarques/status-embarques.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    { path: '', component: InicioComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuariosAdd', component: UsuariosAddComponent },
    { path: 'edit-user/:id', component: UsuariosEditComponent },
    { path: 'embarques', component: EmbarquesComponent },
    { path: 'status', component: StatusEmbarquesComponent },

  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
