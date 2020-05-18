import * as fromEstadisticas from './componentes/peliculas/ngrx/estadisticas.reducer';
import * as fromPaises from './componentes/peliculas/ngrx/paises.reducer';
import * as fromFechas from './componentes/peliculas/ngrx/fechas.reducer';
import * as fromPeliculas from './componentes/peliculas/ngrx/peliculas.reducer';
import * as fromUi from './componentes/shared/ui.reducer';
import * as fromAuth from './componentes/auth/auth.reducer';

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface State {

  stadts: fromEstadisticas.State;
  peliculas: fromPeliculas.State;
  fechas: fromFechas.State;
  ui: fromUi.State;
  auth: fromAuth.State;
  pais: fromPaises.State

}

export const reducers: ActionReducerMap<State> = {

  stadts: fromEstadisticas.estadisticasReducer,
  peliculas: fromPeliculas.peliculasReducer,
  fechas: fromFechas.fechasReducer,
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  pais: fromPaises.paisesReducer

};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getPeliculasState = createFeatureSelector<fromPeliculas.State>(
  'peliculas'
);
export const getPeliculasDisponibles = createSelector(
  getPeliculasState,
  (state: fromPeliculas.State) => state.peliculasDisponibles
);

export const getPeliculaActiva = createSelector(getPeliculasState, (state: fromPeliculas.State) => state.peliculaActiva)

export const getFechasState = createFeatureSelector<fromFechas.State>('fechas');
export const getFechasDisponibles = createSelector(
  getFechasState,
  (state: fromFechas.State) => state.fechasDisponibles
);

export const getEventosDisponibles = createSelector(getFechasState, (state: fromFechas.State) => state.eventosDisponibles)



export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getEstadisticasState = createFeatureSelector<fromEstadisticas.State>('stadts');
export const getEstadisticasDisponibles = createSelector(
  getEstadisticasState,
  (state: fromEstadisticas.State) => state.estadisticasDisponibles
);

export const getPaisesState = createFeatureSelector<fromPaises.State>('pais');
export const getPaisesDisponibles = createSelector(
  getPaisesState,
  (state: fromPaises.State) => state.paisesDisponibles
);
