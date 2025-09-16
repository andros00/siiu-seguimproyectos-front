export class ProyectoBase {
  codigo!: string;
  convocatoria!: number;
  modalidadConvocatoria!: number;
  procesoSeleccion!: number;
  subtipoProyecto!: number;
  etapaActual!: number;
  instanciaAdmtivaActual!: number;
  centroGestion!: number;
  fechaEnvioCentro!: Date;
  responsable!: string;
  selectorResponsable!: string;
  seccional!: string;
  selectorSeccional!: string;
  estado!: string;
  fechaAprobacionRechazo!: Date;
  fechaRegistro!: Date;
  nombreCorto!: string;
  nombreCompleto!: string;
  palabrasClaves!: string;
  duracion!: number;
  lugarEjecucion!: string;
  moneda!: string;
  pendienteAjustePpto!: number;
  periodoCronograma!: string;
}
