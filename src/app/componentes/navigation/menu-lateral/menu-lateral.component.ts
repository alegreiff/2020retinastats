import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rl-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
@Output()
  cierraMenuLateral = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {

  }
  onClose(){
    this.cierraMenuLateral.emit();
  }
  onLogout(){
    this.onClose();


  }

}
