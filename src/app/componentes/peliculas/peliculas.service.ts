import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFilme } from 'src/app/models/filme';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as Peliculas from './ngrx/peliculas.actions';
import * as Fechas from './ngrx/fechas.actions';
import * as Estadisticas from './ngrx/estadisticas.actions';
import * as Paises from './ngrx/paises.actions';
import { asignarDatosPeliculas, limpiarfechas } from './peliculas.funciones';
import { map, take } from 'rxjs/operators';
import * as UI from '../shared/ui.actions';
import { IFecha } from 'src/app/models/fechas';
import { IEstadistica } from 'src/app/models/estadistica';
import { IPais } from 'src/app/models/paises';
import { Observable, of } from 'rxjs';
import { ConstantesService } from 'src/app/constantes.service';
import * as _ from 'lodash';
import { IDatoBasico } from 'src/app/models/datobasico';
import { IEvento } from 'src/app/models/eventos';

@Injectable()
export class PeliculasService {
  temporalpeliculas: IFilme[];
  private apiserver: string = 'http://js.presencia.co/';

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private constantesService: ConstantesService
  ) {
    console.log('Service on board');
    //this.cargaAllPeliculas();
  }
  cargaTodo() {
    this.cargaAllPeliculas();
    this.cargaAllStadts();
    this.cargaAllPaises();

  }

  cargaAllPeliculas() {
    this.store
      .select(fromRoot.getPeliculasDisponibles)
      .pipe(take(1))
      .subscribe((data) => {
        if (!data || data.length === 0) {
          console.log('NO HAY DATTAS');
          this.store.dispatch(new UI.StartLoading());
          this.http
            .get<IFilme[]>(`${this.apiserver}peliculas`)
            .pipe(map((peliculas) => asignarDatosPeliculas(peliculas)))
            .subscribe((pelis: IFilme[]) => {
              this.store.dispatch(new UI.StopLoading());
              this.store.dispatch(
                new Peliculas.FijaPeliculasDisponibles(pelis)
              );
              this.temporalpeliculas = pelis;
              this.cargaAllFechas();
            });
        }
      });
  }

  cargaAllFechas() {
    this.store
      .select(fromRoot.getFechasDisponibles)
      .pipe(take(1))
      .subscribe((data) => {
        if (!data || data.length === 0) {
          console.log('NO HAY FECHAS');
          this.store.dispatch(new UI.StartLoading());
          this.http
            .get<IFecha[]>(`${this.apiserver}fechas`)
            .pipe(map((fechas) => limpiarfechas(fechas)))
            .subscribe((fechas: IFecha[]) => {
              this.store.dispatch(new UI.StopLoading());
              this.store.dispatch(new Fechas.FijaFechas(fechas));
              this.creaEventos(fechas);
            });
        }
      });
  }

  creaEventos(fechas: IFecha[]) {
    if (fechas.length > 0) {
      this.store.dispatch(new UI.StartLoading());
      console.log('SISAS', fechas.length);
      let salida = [];
      for (let item of fechas) {
        let titulo = this.temporalpeliculas.find((peli) => peli.id === item.PeliculaId)
          .titulo;
        salida.push({
          title: 'Ingreso: ' + titulo,
          color: this.constantesService.colors.yellow,
          start: new Date(item.entrada),
        });
        if (item.salida) {
          salida.push({
            title: 'Salida: ' + titulo,
            color: this.constantesService.colors.red,
            start: new Date(item.salida),
          });
        }
      }
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Fechas.CreaEventos(salida));
    } else {
      return [];
    }
  }

  cargaAllStadts() {
    this.store
      .select(fromRoot.getFechasDisponibles)
      .pipe(take(1))
      .subscribe((data) => {
        if (!data || data.length === 0) {
          console.log('NO HAY STADTS');
          this.store.dispatch(new UI.StartLoading());
          this.http
            .get<IEstadistica[]>(`${this.apiserver}estadisticas`)
            .subscribe((estadisticas: IEstadistica[]) => {
              this.store.dispatch(new UI.StopLoading());
              this.store.dispatch(
                new Estadisticas.FijaEstadisticas(estadisticas)
              );
            });
        }
      });
  }

  cargaAllPaises() {
    this.store
      .select(fromRoot.getPaisesDisponibles)
      .pipe(take(1))
      .subscribe((data) => {
        if (!data || data.length === 0) {
          console.log('NO HAY PAÍSES');
          this.store.dispatch(new UI.StartLoading());
          this.http
            .get<IPais[]>(`${this.apiserver}paises`)
            .subscribe((paises: IPais[]) => {
              this.store.dispatch(new UI.StopLoading());
              this.store.dispatch(new Paises.FijaPaises(paises));
            });
        }
      });
  }
  visitasPelicula(): IDatoBasico[][] {
    let salida = [];
    let salidayears = [];
    this.store.select(fromRoot.getPeliculaActiva).subscribe((data) => {
      const years = this.constantesService.years;
      if (!_.isEmpty(data)) {
        for (let item of data.visitas) {
          salida.push({
            name: item.year + '/' + item.month,
            value: item.visitas,
          });
        }
        for (let year of years) {
          salidayears.push({
            name: year,
            value: _.sumBy(
              data.visitas.filter((e) => e.year === year),
              'visitas'
            ),
          });
        }
      }
    });
    return [salida, salidayears];
  }

  googleMap(mes: number = 0, year: number = 0): Observable<any[]> {
    const mapa$ = this.store.select(fromRoot.getPaisesDisponibles);
    let salida = [];
    let losdatos: IPais[];
    mapa$.subscribe((datos) => (losdatos = datos));
    console.log('MAPPA DONE', losdatos.length);
    //PERIODO MENSUAL

    if (mes !== 0 && year !== 0) {
      losdatos = losdatos.filter((m) => m.year == year && m.mes == mes);
    }
    //PERIODO ANUAL
    if (mes == 0 && year > 0) {
      losdatos = losdatos.filter((m) => m.year == year);
    }

    //losdatos = _.orderBy(losdatos, 'sesiones', 'desc')
    let listapaises = [...new Set(losdatos.map((item) => item.pais))];
    for (let con of listapaises) {
      let ss = _.sumBy(losdatos, function (o: IPais) {
        return o.pais == con && o.sesiones;
      });
      salida.push([con, ss]);
    }
    salida = salida.sort(this.compareSecondColumn);
    return of(salida);
  }

  private compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] > b[1] ? -1 : 1;
    }
  }
}
