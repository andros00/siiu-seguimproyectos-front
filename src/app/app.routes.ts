import { Routes } from "@angular/router";
import { ProyectoComponent } from "./features/proyecto/proyecto.component";
import { InicioFormalComponent } from "./features/inicio-formal/inicio-formal.component";

export const routes: Routes = [
  { path: "", component: ProyectoComponent },
  { path: "tramitesAdministrativos/SeguimientoProyectos", component: ProyectoComponent },
  { path: 'tramitesAdministrativos/SeguimientoProyectos/inicioFormal', component: InicioFormalComponent },
];
