import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { Observable } from 'rxjs';
import { IFilme } from 'src/app/models/filme';
import { IDatoBasico } from 'src/app/models/datobasico';
import * as Peliculas from '../ngrx/peliculas.actions';
import { PeliculasService } from '../peliculas.service';
import { ConstantesService } from 'src/app/constantes.service';

@Component({
  selector: 'rl-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  id: number;
  peliculaActiva$: Observable<IFilme>;
  colorScheme = {};
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Año / mes';
  yAxisLabel = 'Reproducciones';
  legend = false;
  testData: IDatoBasico[][];
  datosGrafica: IDatoBasico[];
  botonactivo: string;
  endOfMonth: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private peliculasService: PeliculasService,
    private constantesService: ConstantesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.endOfMonth = this.constantesService.endOfMonth;
    this.colorScheme = this.constantesService.colorScheme;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new Peliculas.SeleccionaPelicula(this.id));
    this.peliculaActiva$ = this.store.select(fromRoot.getPeliculaActiva);
    if(this.peliculaActiva$){
      this.testData = this.peliculasService.visitasPelicula()
    }else{
      this.router.navigateByUrl('/peliculas')
    }

    /* if(this.peliculaActiva$){
      this.testData = this.peliculasService.visitasPelicula(this.peliculaActiva$)
    } */
    this.datosGrafica = this.testData[0]
    this.botonactivo = 'mes'
  }

  mes() {
    console.log('MES')
    this.botonactivo='mes'
    this.datosGrafica = this.testData[0]
  }
  year() {
    console.log('YIAR')
    this.botonactivo='year'
    this.datosGrafica = this.testData[1]
  }
}
