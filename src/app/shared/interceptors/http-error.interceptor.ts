import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GenericResponse } from '../models/genericResponse';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: any) => {
        // Solo revisamos respuestas HTTP 200 que tienen GenericResponse
        if (event?.body?.code && event.body.code !== '200') {
          this.errorHandler.handleErrorResponse(event.body as GenericResponse<any>);
          throw new Error(event.body.message || 'Error en la respuesta del servidor');
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Errores de red o servidor
        this.errorHandler.handleServiceError(error);
        return throwError(() => new Error(error.message || 'Error desconocido en el servidor'));
      })
    );
  }
}
