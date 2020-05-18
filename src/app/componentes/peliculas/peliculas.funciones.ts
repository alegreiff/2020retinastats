import { IFilme } from 'src/app/models/filme';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment/locale/es';
import { IFecha } from 'src/app/models/fechas';

const hoy = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
const endOfMonth = moment()
  .subtract(1, 'months')
  .endOf('month')
  .format('YYYY-MM-DD');

export function asignarDatosPeliculas(datos: IFilme[]): IFilme[] {
  datos.map(
    (v) =>
      (v.sumvisitas = v.visitas.reduce((prev, cur) => prev + cur.visitas, 0))
  );
  datos.map(
    (v) =>
      (v.visitas16 = v.visitas
        .filter((peli) => peli.year === 2016)
        .reduce((prev, cur) => prev + cur.visitas, 0))
  );
  datos.map(
    (v) =>
      (v.visitas17 = v.visitas
        .filter((peli) => peli.year === 2017)
        .reduce((prev, cur) => prev + cur.visitas, 0))
  );
  datos.map(
    (v) =>
      (v.visitas18 = v.visitas
        .filter((peli) => peli.year === 2018)
        .reduce((prev, cur) => prev + cur.visitas, 0))
  );
  datos.map(
    (v) =>
      (v.visitas19 = v.visitas
        .filter((peli) => peli.year === 2019)
        .reduce((prev, cur) => prev + cur.visitas, 0))
  );
  datos.map(
    (v) =>
      (v.visitas20 = v.visitas
        .filter((peli) => peli.year === 2020)
        .reduce((prev, cur) => prev + cur.visitas, 0))
  );
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].temporadas.length > 1) {
      datos[i].temporadas = _.orderBy(datos[i].temporadas, 'entrada', 'desc');
    }
  }

  datos.map((datos) => {
    let esactiva = 'NO';
    const date = new Date();
    const fechacorte = moment(endOfMonth);
    for (let index of datos.temporadas) {
      let fecha_entrada = moment(index.entrada);
      let fecha_salida = moment(index.salida);
      if (index.salida == null) {
        index.diasalaire = moment
          .duration(fechacorte.diff(fecha_entrada))
          .asDays();
      } else if (moment(index.salida).isSameOrAfter(hoy)) {
        index.diasalaire = moment
          .duration(fechacorte.diff(fecha_entrada))
          .asDays();
      } else {
        index.diasalaire = moment
          .duration(fecha_salida.diff(fecha_entrada))
          .asDays();
      }
    }

    if (datos.temporadas[0].salida == null) {
      esactiva = 'SI';
    } else if (moment(datos.temporadas[0].salida).isSameOrAfter(hoy)) {
      esactiva = 'SI';
    }

    datos.activa = esactiva;
  });

  datos.map(
    (v) =>
      (v.sumdias = v.temporadas.reduce((prev, cur) => prev + cur.diasalaire, 0))
  );
  datos.map((datos) => {
    datos.promedio = datos.sumvisitas / datos.sumdias;
  });
  console.log('FIN de asignación STORE MODE SINGLE FILE SMSF--BIK');
  datos = _.orderBy(datos, ['sumdias', 'sumvisitas'], ['desc', 'desc']);
  console.log('LA DATA', datos[0]);
  //_.orderBy(datos[i].temporadas, 'entrada', 'desc')
  return datos;
}


export function limpiarfechas(datos: IFecha[]): IFecha[] {
  //datos.forEach(function(v){ delete v.Pelicula });
  datos.map(item => {
    delete item.Pelicula,
      item.entrada = moment(item.entrada, "YYYY-MM-DD"),
      item.salida = moment(item.salida, "YYYY-MM-DD")
  })
  return datos;
}
