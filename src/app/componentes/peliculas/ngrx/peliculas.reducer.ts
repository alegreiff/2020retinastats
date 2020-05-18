import {
  PeliculasActions,
  FIJA_PELICULAS_DISPONIBLES,

  SELECCIONA_PELICULA

} from './peliculas.actions';
import { IFilme } from 'src/app/models/filme';

export interface State {
  peliculasDisponibles: IFilme[];
  peliculaActiva: IFilme;
}

const initialState: State = {
  peliculasDisponibles: [],
  peliculaActiva: null
};

export function peliculasReducer(
  state = initialState,
  action: PeliculasActions
) {
  switch (action.type) {
    case FIJA_PELICULAS_DISPONIBLES:
      console.log('Pelis disponibles ngrx');
      return {
        ...state,
        peliculasDisponibles: action.payload,
      };
      case SELECCIONA_PELICULA:
        //console.log("Muestra PELI")
        return {
            ...state,
            peliculaActiva: { ...state.peliculasDisponibles.find( film => film.id === action.payload) }
        }

    default: {
      return state;
    }
  }
}
