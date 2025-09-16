import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Proyecto } from '../shared/models/proyecto';
import { GenericResponse } from '../shared/models/genericResponse';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private baseUrl = environment.serviceURL + 'proyectos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const proyecto: Proyecto = {
      codigo: '2013-81',
    };

    this.consultarProyectos(proyecto);
  }

  consultarProyectos(proyecto: Proyecto): Observable<Proyecto[]> {
    return this.http
      .post<GenericResponse<Proyecto[]>>(`${this.baseUrl}/consultar`, proyecto)
      .pipe(map((res) => res.data || []));
  }
}
