import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer'

@Component({
  selector: 'rl-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

}
