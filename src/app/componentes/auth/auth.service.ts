import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private uiservice: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/acceder']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiservice.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiservice.showSnackbar('Bienvenido', null, 3000);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        this.uiservice.showSnackbar(error.message, 'Entendido', 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
