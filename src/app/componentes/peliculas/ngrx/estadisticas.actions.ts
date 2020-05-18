import { Action } from '@ngrx/store';
import { IEstadistica } from 'src/app/models/estadistica';

export const FIJA_ESTADISTICAS_DISPONIBLES  = '[ESTADÍSTICAS] Carga datos estadísticos';

export class FijaEstadisticas implements Action {
  readonly type = FIJA_ESTADISTICAS_DISPONIBLES;
  constructor(public payload: IEstadistica[]){}
}

export type EstadisticasActions = FijaEstadisticas;
