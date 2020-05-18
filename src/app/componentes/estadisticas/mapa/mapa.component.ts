import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { IPais } from 'src/app/models/paises';
import { Observable } from 'rxjs';
import { PeliculasService } from '../../peliculas/peliculas.service';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {MatDatepicker} from '@angular/material/datepicker';



@Component({
  selector: 'rl-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @ViewChild('dp', {read: undefined, static: false}) datePicker: MatDatepicker<Date>;



  options = {
    displayMode: 'region',
    legend: {
      textStyle: {
        color: 'red',
        fontSize: 16,
        bold: true
      }
    },
    magnifyingGlass: {
      enable: true,
      zoomFactor: 2.5
    },
    tooltip: {
      textStyle: {
        color: '#5ac4ee',
        showColorCode: true
      }
    },
    region: 'world',
    colorAxis: {
      colors: ['#eeeeee', '#ed347d']
    },
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#fff'
  }
  datosMapa$: Observable<IPais[]>;
  datamapa: Observable<any[]>;
  minDate: Date;
  maxDate: Date;
  date = new FormControl(_moment());

  constructor(
    private store: Store<fromRoot.State>,
    private peliculasService: PeliculasService

  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 6, 0, 1);
    this.maxDate = new Date(currentYear - 0, 1, 0);
   }

  ngOnInit() {

    //this.datosMapa$ = this.store.select(fromRoot.getPaisesDisponibles)
    this.datamapa = this.peliculasService.googleMap(0,0)
    if(this.datePicker){
      this.datePicker.open()
    }
  }

cambiaDatos(mes:number, year: number){
  this.datamapa = this.peliculasService.googleMap(mes,year)
}

chosenYearHandler(normalizedYear: any) {
  console.log(normalizedYear)
}

chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
  console.log(normalizedMonth)
  console.log(datepicker)
  datepicker.close();


}

}
