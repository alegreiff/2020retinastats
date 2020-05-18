import { Action } from '@ngrx/store';
import { IFecha } from 'src/app/models/fechas';
import { IEvento } from 'src/app/models/eventos';

export const FIJA_FECHAS_DISPONIBLES  = '[FECHAS] Carga fechas';
export const FIJA_EVENTOS_PELICULAS = 'FECHAS[] Crea eventos'


export class FijaFechas implements Action {
  readonly type = FIJA_FECHAS_DISPONIBLES;
  constructor(public payload: IFecha[]){}
}

export class CreaEventos implements Action {
  readonly type = FIJA_EVENTOS_PELICULAS;
  constructor(public payload: IEvento[]){}
}

export type FechasActions = FijaFechas | CreaEventos;
