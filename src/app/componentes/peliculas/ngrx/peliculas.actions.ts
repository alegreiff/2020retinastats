import { Action } from '@ngrx/store';
import { IFilme } from 'src/app/models/filme';

export const FIJA_PELICULAS_DISPONIBLES = '[PELIS] Carga películas disponibles';
export const SELECCIONA_PELICULA  = '[PELIS] Selecciona una película';
/* export const PELICULA_ACTIVA_VISITAS_MES = '[PELIS] Visitas mensuales película'; */

export class FijaPeliculasDisponibles implements Action {
  readonly type = FIJA_PELICULAS_DISPONIBLES;
  constructor(public payload: IFilme[]) {}
}

export class SeleccionaPelicula implements Action {
  readonly type = SELECCIONA_PELICULA;
  constructor(public payload: number){}
}


export type PeliculasActions = FijaPeliculasDisponibles | SeleccionaPelicula;
