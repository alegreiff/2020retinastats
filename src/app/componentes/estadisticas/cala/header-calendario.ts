import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { ConstantesService } from '../../../constantes.service'


@Component({
  selector: 'mwl-demo-utils-calendar-header',
  templateUrl: './header-calendario.html',
})
export class CalendarHeaderComponent implements OnInit{
  constructor(
    private constantesService: ConstantesService
  ){

  }
  ngOnInit(){
    this.minDate = new Date(this.constantesService.inicioRetina)
    this.maxDate = new Date(this.constantesService.endOfMonth)
  }
  minDate: Date;
  maxDate: Date;

  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'es';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
