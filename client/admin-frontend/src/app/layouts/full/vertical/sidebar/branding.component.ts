import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [NgIf],
  template: `
    <div
      class="branding w-100 d-flex align-items-center justify-content-center"
    >
      @if(options.theme === 'light') {
      <a href="/">
        <img
          src="./assets/images/logo.png"
          class="align-middle m-2"
          alt="logo"
          height="50"
        />
      </a>
      } @if(options.theme === 'dark') {
      <a href="/">
        <img
          src="./assets/images/logo.png"
          class="align-middle m-2"
          alt="logo"
          height="50"
        />
      </a>
      }
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
}
