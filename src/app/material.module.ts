import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
      MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule   
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
  ]
})
export class MaterialModule {}
