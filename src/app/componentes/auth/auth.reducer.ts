import { AuthActions, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from './auth.actions'

export interface State {
    isAuthenticated: boolean;
};

const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            console.log("SISAS AUTH")
            return {
                isAuthenticated: true
            }
        case SET_UNAUTHENTICATED:
            console.log("NOLAS AUTH")
            return {
                isAuthenticated: false
            }
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;