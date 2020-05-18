import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { DetalleComponent } from './componentes/peliculas/detalle/detalle.component';
import { MapaComponent } from './componentes/estadisticas/mapa/mapa.component';
import { CalaComponent } from './componentes/estadisticas/cala/cala.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'peliculas', component: PeliculasComponent},
  { path: 'acceder', component: LoginComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'mapa', component: MapaComponent},
  { path: 'peliculas/:id', component: DetalleComponent },
  { path: 'cala', component: CalaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
