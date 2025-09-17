import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})

export class LoadingSpinnerComponent {
  constructor(private loadingService: LoadingService) {}

  get loading$() {
    return this.loadingService.loading$;
  }
}

