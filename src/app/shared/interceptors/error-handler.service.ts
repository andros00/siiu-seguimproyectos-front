import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { GenericResponse } from '../models/genericResponse';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  // Maneja respuestas con código interno de error
  handleErrorResponse(response: GenericResponse<any>): void {
    if (response.code !== '0') {
      console.error('Detalles del error:', response.message);
      Swal.fire('Error', response.message || 'Error desconocido', 'error');
    }
  }

  // Maneja errores HTTP
  handleServiceError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      switch (error.status) {
        case 0:
          errorMessage = 'Error en la conexión al servidor';
          break;
        case 400:
          errorMessage = error.error?.message || 'Error en la solicitud';
          break;
        case 500:
          errorMessage = 'Error en el servidor';
          break;
        default:
          errorMessage = `Código de error: ${error.status} - ${error.statusText}`;
      }
    }

    console.error('Error HTTP capturado:', error);
    Swal.fire('Error', errorMessage, 'error');

    return throwError(() => new Error(errorMessage));
  }
}
