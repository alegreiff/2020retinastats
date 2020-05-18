import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Injectable()
export class ConstantesService {
  endOfMonth = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')
  inicioRetina: string = '2016-03-04'

  meses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2016, 2017, 2018, 2019, 2020];
  colorScheme = {
    domain: ['#810d70', '#BC2667', '#E55559', '#FD8A4E', '#FFC151', '#F9F871'],
  };
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };


}
