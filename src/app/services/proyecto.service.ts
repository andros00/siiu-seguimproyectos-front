import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Proyecto } from '../shared/models/proyecto';
import { GenericResponse } from '../shared/models/genericResponse';
import { EstadoProyecto } from '../shared/models/estadoProyecto ';
import { TipoProyecto } from '../shared/models/tipoProyecto';
import { CentroAdministrativo } from '../shared/models/centroAdministrativo ';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {

  private readonly baseUrl = environment.serviceURL + 'proyectos';
  private readonly backendUrl = 'http://172.19.1.8:9080/siiu/backend';

  constructor(private http: HttpClient) {}

  consultarProyectos(proyecto: Proyecto): Observable<Proyecto[]> {
    return this.http
      .post<GenericResponse<Proyecto[]>>(`${this.baseUrl}/consultar`, proyecto)
      .pipe(map((res) => res.data || []));
  }

  getCentros(): Observable<CentroAdministrativo[]> {
    return this.http.get<CentroAdministrativo[]>(`${this.backendUrl}/compartido/centros-administrativos`);
  }

  getEstadosPorUsuario(): Observable<EstadoProyecto[]> {
    return this.http.get<EstadoProyecto[]>(`${this.backendUrl}/proyecto/estados-por-usuario`);
  }

  getTiposProyecto(): Observable<TipoProyecto[]> {
    return this.http.get<TipoProyecto[]>(`${this.backendUrl}/compartido/tipos-proyecto`);
  }
}
