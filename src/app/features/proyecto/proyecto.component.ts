import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../shared/models/proyecto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { EstadoProyecto } from '../../shared/models/estadoProyecto ';
import { TipoProyecto } from '../../shared/models/tipoProyecto';
import { forkJoin } from 'rxjs';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../services/loading.service';
import { CentroAdministrativo } from '../../shared/models/centroAdministrativo ';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavContent, MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MaterialModule, LoadingSpinnerComponent, MatMenuModule, MatSidenavContent, MatSidenav, MatSidenavContainer],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss',
})
export class ProyectoComponent implements OnInit {
  formBusqueda!: FormGroup;
  dataSource = new MatTableDataSource<Proyecto>([]);
  centros: CentroAdministrativo[] = [];
  estados: EstadoProyecto[] = [];
  tipos: TipoProyecto[] = [];
  totalRegistros = 0; 
    mostrarFiltros = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    'acciones'
  ];

  constructor(
    private fb: FormBuilder,
    private proyectoService: ProyectoService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarFiltrosIniciales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private inicializarFormulario(): void {
    this.formBusqueda = this.fb.group({
      codigo: [''],
      centroGestion: [''],
      estado: [''],
      convocatoria: [''],
      procesoSeleccion: [''],
      tipoProyecto: [''],
    });
  }

  private cargarFiltrosIniciales(): void {
    this.loadingService.show();

    forkJoin({
      centros: this.proyectoService.getCentros(),
      estados: this.proyectoService.getEstadosPorUsuario(),
      tipos: this.proyectoService.getTiposProyecto(),
    }).subscribe({
      next: ({ centros, estados, tipos }) => {
        this.centros = centros;
        this.estados = estados;
        this.tipos = tipos;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Error al cargar filtros iniciales:', err);
      },
    });
  }

  consultar(): void {
    const filtros: Proyecto = this.formBusqueda.value;
    this.loadingService.show();

    this.proyectoService.consultarProyectos(filtros).subscribe({
      next: (data) => {
        console.log('Proyectos consultados:', data);
        this.dataSource.data = data;
        this.totalRegistros = data.length; 
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Error al consultar proyectos:', err);
        this.loadingService.hide();
      },
    });
  }

  verDetalle() {
}

realizarInicioFormal() {
}

toggleFiltros(): void {
  this.mostrarFiltros = !this.mostrarFiltros;
}

  limpiarFiltros(): void {
    this.formBusqueda.reset();
    this.dataSource.data = [];
  }
}
