import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { StoreModule} from '@ngrx/store'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './componentes/navigation/header/header.component';
import { MenuLateralComponent } from './componentes/navigation/menu-lateral/menu-lateral.component';
import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PeliculasService } from './componentes/peliculas/peliculas.service';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './app.reducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { LoginComponent } from './componentes/auth/login/login.component';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AuthService } from './componentes/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UIService } from './componentes/shared/ui.service';
import { TestComponent } from './componentes/peliculas/test/test.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConstantesService } from './constantes.service';
import { DetalleComponent } from './componentes/peliculas/detalle/detalle.component';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);
import { GoogleChartsModule } from 'angular-google-charts';
import { MapaComponent } from './componentes/estadisticas/mapa/mapa.component';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalaComponent } from './componentes/estadisticas/cala/cala.component';
import { CalendarHeaderComponent } from './componentes/estadisticas/cala/header-calendario';
import {
  CalendarModule,  DateAdapter} from 'angular-calendar';



export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuLateralComponent,
    PeliculasComponent,
    InicioComponent,
    LoginComponent,
    TestComponent,
    EstadisticasComponent,
    DetalleComponent,
    MapaComponent,
    CalaComponent, CalendarHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    FlexLayoutModule,
    HttpClientModule,

    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseCK),
    FormsModule, ReactiveFormsModule, AngularFireAuthModule, NgxChartsModule, GoogleChartsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),



  ],
  providers: [PeliculasService, AuthService, UIService, ConstantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
