import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstadistica } from 'src/app/models/estadistica';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import 'moment/locale/es';
import { ConstantesService } from '../../constantes.service'
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'rl-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  @ViewChild(MatButtonToggleGroup) graficaTipo: MatButtonToggleGroup
  estadisticas$: Observable<IEstadistica[]>;
  colorScheme = {};
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Cinco años de Retina Latina';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Cargando';
  legendTitle: string = 'Años';
  datosbase: any[];
  losdatos: IEstadistica[];
  meses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2016, 2017, 2018, 2019, 2020];
  constructor(
    private store: Store<fromRoot.State>,
    private constantesService: ConstantesService
    ) {}

  ngOnInit() {
    this.colorScheme = this.constantesService.colorScheme;
    this.estadisticas$ = this.store.select(fromRoot.getEstadisticasDisponibles);
    this.store.select(fromRoot.getEstadisticasDisponibles).subscribe((res) => {
      this.losdatos = res;
      this.datosGrafica('sesiones')
    })
  }

  datointerno(campo: string, mes: number) {
    let salida = [];
    for (let year of this.constantesService.years) {
      salida.push({ name: year, value: this.visitasKaltura(campo, year, mes) });
    }
    return salida;
  }

  datosGrafica(campo: string) {
    const datos = this.constantesService.meses.map((m) => {
      const internos = this.datointerno(campo, m);
      return {
        name: moment()
          .month(m - 1)
          .format('MMM'),
        series: internos,
      };
    });
    this.yAxisLabel = campo;
    this.datosbase = datos;
  }

  visitasKaltura(campo: string, year: number, mes: number) {
    const sale = this.losdatos.find((e) => e.year == year && e.mes == mes);
    if (sale) {
      return sale[campo];
    } else {
      return 0;
    }
  }

  buttongroup(){
    console.log(this.graficaTipo.value)
    this.datosGrafica(this.graficaTipo.value)
  }
}
