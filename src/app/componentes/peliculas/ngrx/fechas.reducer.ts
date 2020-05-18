import { FIJA_FECHAS_DISPONIBLES, FIJA_EVENTOS_PELICULAS, FechasActions } from './fechas.actions';

import { IFecha } from 'src/app/models/fechas';
import { IEvento } from 'src/app/models/eventos';

export interface State {
  fechasDisponibles: IFecha[];
  eventosDisponibles: IEvento[];
}

const initialState: State = {
  fechasDisponibles: [],
  eventosDisponibles: []
};

export function fechasReducer(state = initialState, action: FechasActions) {
  switch (action.type) {
    case FIJA_FECHAS_DISPONIBLES:
      console.log('Fechas disponibles ngrx');
      return {
        ...state,
        fechasDisponibles: action.payload,
      };
    case FIJA_EVENTOS_PELICULAS:
      console.log('Os eventos disponiveis')
      return {
        ...state,
        eventosDisponibles: action.payload
      }

    default: {
      return state;
    }
  }
}
