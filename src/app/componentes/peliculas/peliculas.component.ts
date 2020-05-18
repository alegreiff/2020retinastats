import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { IFilme } from 'src/app/models/filme';
import { MatTableDataSource } from '@angular/material/table';
import { PeliculasService } from './peliculas.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'rl-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss'],
})
export class PeliculasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginador: MatPaginator;
  datosPeliculas = new MatTableDataSource<IFilme>();
  displayedColumns = ['index', 'titulo', 'pais', 'sumvisitas', 'sumdias', 'id'];
  isLoading$: Observable<boolean>
  constructor(
    private store: Store<fromRoot.State>,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit() {
    this.peliculasService.cargaTodo();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.store
      //.select(fromPeliculas.getPeliculasDisponibles)
      .select(fromRoot.getPeliculasDisponibles)
      .subscribe((films: IFilme[]) => {
        this.datosPeliculas.data = films;

      });
  }
  ngAfterViewInit() {
    this.datosPeliculas.sort = this.sort;
    this.paginador._intl.itemsPerPageLabel = 'Películas por página'
    this.paginador._intl.nextPageLabel = 'Siguiente'
    this.paginador._intl.previousPageLabel = 'Anterior'
    this.datosPeliculas.paginator = this.paginador;

  }
  filtraContenidos(cadenabuscada: string){
    this.datosPeliculas.filter = cadenabuscada.trim().toLowerCase();

  }
}
