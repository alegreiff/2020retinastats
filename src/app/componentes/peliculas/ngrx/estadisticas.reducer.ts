import { FIJA_ESTADISTICAS_DISPONIBLES, FijaEstadisticas  } from './estadisticas.actions';
import { IEstadistica } from 'src/app/models/estadistica';

export interface State {
  estadisticasDisponibles: IEstadistica[];
}

const initialState: State = {
  estadisticasDisponibles: [],
};

export function estadisticasReducer(state = initialState, action: FijaEstadisticas) {
  switch (action.type) {
    case FIJA_ESTADISTICAS_DISPONIBLES:
      console.log('STADTS disponibles ngrx');
      return {
        ...state,
        estadisticasDisponibles: action.payload,
      };

    default: {
      return state;
    }
  }
}
