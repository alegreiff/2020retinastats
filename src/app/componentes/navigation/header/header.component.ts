import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer'
import { Observable } from 'rxjs';
@Component({
  selector: 'rl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  sidenavToggle = new EventEmitter<void>();
  isLogged$: Observable<boolean>

  constructor(
    private authservice: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLogged$ = this.store.select(fromRoot.getIsAuth)

  }
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  logout(){
    this.authservice.logout();
  }

}
