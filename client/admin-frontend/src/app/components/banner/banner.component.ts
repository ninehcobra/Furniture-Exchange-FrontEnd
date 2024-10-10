import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="banner" [ngClass]="type">
      <span class="banner-message">{{ message }}</span>
      <button class="close-button" (click)="onClose()">×</button>
    </div>
  `,
  styles: [
    `
      .banner {
        width: 100%;
        padding: 15px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .success {
        background-color: #4caf50;
      }
      .error {
        background-color: #f44336;
      }
      .warning {
        background-color: #ff9800;
      }
      .info {
        background-color: #2196f3;
      }
      .close-button {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }
    `,
  ],
})
export class BannerComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';

  constructor(private bannerService: BannerService) {}

  onClose() {
    this.bannerService.hide();
  }

  ngOnInit() {
    this.setAutoHideTimer();
  }

  private setAutoHideTimer() {
    setTimeout(() => {
      this.bannerService.hide();
    }, 5000);
  }
}
