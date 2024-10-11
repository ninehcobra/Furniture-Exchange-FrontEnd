import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';

import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-email-confirm',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './email-confirm.component.html',
})
export class AppEmailConfirmComponent implements OnInit {
  email: string = '';
  options = this.settings.getOptions();
  isResendDisabled: boolean = false;
  remainingTime: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settings: CoreService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const state = window.history.state;
      this.email = state.email;
    });

    if (!this.email) {
      this.router.navigate(['/authentication/side-login']);
    }
  }

  resendEmail(): void {
    console.log('Resend email');
    this.isResendDisabled = true;
    this.remainingTime = 90; // 1 minute and 30 seconds

    const timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(timer);
        this.isResendDisabled = false;
      }
    }, 1000);
  }
}
