import { Component } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../shared/models/proyecto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss',
})
export class ProyectoComponent {

  formBusqueda!: FormGroup;
  dataSource = new MatTableDataSource<Proyecto>([]);
  columnasTabla: string[] = [
    'codigo',
    'proyecto',
    'estado',
    'nivel',
    'convocatoria',
    'procesoSeleccion',
    'responsable',
    'ipCoordinador',
    'tipoProyecto',
    //'acciones'
  ];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.formBusqueda = this.fb.group({
      codigo: [''],
      centroGestion: [''],
      estado: [''],
      convocatoria: [''],
      procesoSeleccion: [''],
      tipoProyecto: ['']
    });
  }

  consultar(): void {
    const filtros: Proyecto = this.formBusqueda.value;
    this.proyectoService.consultarProyectos(filtros).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('Proyectos consultados:', data);
      },
      error: (err) => {
        console.error('Error al consultar proyectos', err);
      }
    });
  }

  limpiar(): void {
    this.formBusqueda.reset();
    this.dataSource.data = [];
  }
}