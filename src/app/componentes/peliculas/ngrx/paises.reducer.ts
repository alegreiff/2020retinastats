import { FIJA_PAISES_DISPONIBLES, FijaPaises } from './paises.actions';
import { IPais } from 'src/app/models/paises';

export interface State {
  paisesDisponibles: IPais[];
}

const initialState: State = {
  paisesDisponibles: [],
};

export function paisesReducer(state = initialState, action: FijaPaises) {
  switch (action.type) {
    case FIJA_PAISES_DISPONIBLES:
      console.log('Pays disponibles ngrx');
      return {
        ...state,
        paisesDisponibles: action.payload,
      };

    default: {
      return state;
    }
  }
}
