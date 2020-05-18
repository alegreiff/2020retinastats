import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewDay,
} from 'angular-calendar';
//import { PeliculasStore } from 'src/app/core/peliculas.store';
import { IFecha } from 'src/app/models/fechas';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFilme } from 'src/app/models/filme';
//import { LoadingService } from '../../shared/loading/loading.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import * as moment from 'moment';
import 'moment/locale/es';

import { ConstantesService } from 'src/app/constantes.service';
registerLocaleData(localeEs);
import * as Peliculas from '../../peliculas/ngrx/peliculas.actions';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from 'date-fns';
type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths,
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths,
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth,
  }[period](date);
}
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer'
import { IEvento } from 'src/app/models/eventos';



@Component({
  selector: 'rl-cala',
  templateUrl: './cala.component.html',
  styleUrls: ['./cala.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalaComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  nuevoseventos: Observable<IEvento[]>;
  prevBtnDisabled: boolean = false;
  nextBtnDisabled: boolean = false;
  constructor(
    private constantesService: ConstantesService,
    private store:Store<fromRoot.State>
    ) {
    this.dateOrViewChanged();
  }

  ngOnInit() {
    //this.peliculasStore.init();
    this.viewDate = new Date(this.constantesService.endOfMonth);
    this.minDate = new Date(this.constantesService.inicioRetina);
    this.maxDate = addDays(new Date(this.constantesService.endOfMonth), 1);
    this.nuevoseventos = this.store.select(fromRoot.getEventosDisponibles)

    /* this.store.select(fromRoot.getFechasDisponibles).pipe(map((fechas) => fechas))
    .subscribe((fechas) => {
      console.log("FECHAS", fechas)
      if (fechas) {
        this.nuevoseventos = this.creaFechas(fechas);
      }
    }); */
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }
  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (!this.dateIsValid(day.date)) {
        console.log('El mes cambia. Cambia tu');
        day.cssClass = 'cal-disabled';
      }
    });
  }
  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  tituloPelicula(id: number): string {
    this.store.dispatch(new Peliculas.SeleccionaPelicula(id));

    let filme: IFilme;

    this.store.select(fromRoot.getPeliculaActiva)
    .pipe(map((datos) => datos))
    .subscribe((data) => (filme = data));
    return filme.titulo;
  }
}
