import { Action } from '@ngrx/store';
import { IPais } from 'src/app/models/paises';

export const FIJA_PAISES_DISPONIBLES  = '[PAISES] Carga países';


export class FijaPaises implements Action {
  readonly type = FIJA_PAISES_DISPONIBLES;
  constructor(public payload: IPais[]){}
}

export type PaisesActions = FijaPaises;
