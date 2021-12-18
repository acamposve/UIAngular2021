import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmbarquesUsuariosComponent } from './embarques-usuarios/embarques-usuarios.component';
import { EmbarquesAddComponent } from './embarques/embarques-add.component';
import { EmbarquesEditComponent } from './embarques/embarques-edit/embarques-edit.component';
import { EmbarquesComponent } from './embarques/embarques.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReceiptdetailComponent } from './receiptdetail.component';
import { StatusEmbarquesAddComponent } from './status-embarques/status-embarques-add.component';
import { StatusEmbarquesEditComponent } from './status-embarques/status-embarques-edit.component';
import { StatusEmbarquesComponent } from './status-embarques/status-embarques.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const usersModule = () => import('./usuarios/usuarios.module').then(x => x.UsuariosModule);
const routes: Routes = [
  { path: '', component: DashboardComponent, children:[
    { path: '', component: InicioComponent },
    { path: 'usuarios', loadChildren: usersModule },
    { path: 'usuariosAdd', component: UsuariosAddComponent },
    { path: 'edit-user/:id', component: UsuariosEditComponent },
    { path: 'edit-receipt/:id', component: EmbarquesEditComponent },
    { path: 'embarques', component: EmbarquesComponent },
    { path: 'status', component: StatusEmbarquesComponent },
    { path: 'statusAdd', component: StatusEmbarquesAddComponent },
    { path: 'edit-status/:id', component: StatusEmbarquesEditComponent },
    { path: 'receiptAdd', component: EmbarquesAddComponent },
    { path: 'add-user-receipt/:id', component: EmbarquesUsuariosComponent },
    { path: 'receiptdetail/:id', component: ReceiptdetailComponent },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
