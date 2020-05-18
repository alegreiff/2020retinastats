import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas/peliculas.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { Observable } from 'rxjs';

@Component({
  selector: 'rl-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  auth: boolean
  isLoading$: Observable<boolean>
  paises$: Observable<any>
  fechas$: Observable<any>
  peliculas$: Observable<any>
  estadisticas$: Observable<any>
  eventos$: Observable<any>

  constructor(
    private peliculasService: PeliculasService,
    private router: Router,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit(): void {
    this.paises$ = this.store.select(fromRoot.getPaisesDisponibles)
    this.fechas$ = this.store.select(fromRoot.getFechasDisponibles)
    this.peliculas$ = this.store.select(fromRoot.getPeliculasDisponibles)
    this.estadisticas$ = this.store.select(fromRoot.getEstadisticasDisponibles)
    this.eventos$ = this.store.select(fromRoot.getEventosDisponibles)
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.store.select(fromRoot.getIsAuth).subscribe(res => this.auth = res)
    if(this.auth){
      console.log("CJ")
      this.peliculasService.cargaTodo();
    }else{
      this.router.navigateByUrl('/acceder')
    }

  }

}
