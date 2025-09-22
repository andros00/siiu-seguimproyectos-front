import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Proyecto } from '../../shared/models/proyecto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-formal',
  standalone: true,
  imports: [MaterialModule, LoadingSpinnerComponent, MatMenuModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './inicio-formal.component.html',
  styleUrl: './inicio-formal.component.scss'
})
export class InicioFormalComponent {

  formInicioFormal: FormGroup;
  proyecto!: Proyecto;


  constructor(private fb: FormBuilder, private router: Router) {
    this.formInicioFormal = this.fb.group({
      codigo: [''],
      duracion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      fechaAprobacion: [''],
    });
  }
ngOnInit(): void {
  const state = history.state as { proyecto?: Proyecto };

  if (state?.proyecto) {
    this.proyecto = state.proyecto;
    console.log('Proyecto recibido:', this.proyecto);

    this.formInicioFormal.patchValue({
      codigo: this.proyecto.codigo,
      duracion: this.proyecto.duracion,
      fechaInicio: this.proyecto.fechaInicioInicioFormal,
      fechaFin: this.proyecto.fechaInicioFinalizacionFormal
    });
  }
}



  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file);
  }

  guardar() {
    console.log('Datos guardados', this.formInicioFormal.value);
  }

  siguiente() {
    console.log('Ir al siguiente paso');
  }
}
