import { Component, OnInit } from '@angular/core';
import { AuthService } from './componentes/auth/auth.service';

@Component({
  selector: 'rl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'retina';
  openSidenav = false;

  constructor(
    private authService: AuthService
  ){}
ngOnInit(){
  this.authService.initAuthListener()
}

}
