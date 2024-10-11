import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-verify-email',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './confirm-verify-email.component.html',
})
export class AppConfirmVerifyEmail implements OnInit {
  token: string = '';
  options = this.settings.getOptions();

  constructor(
    private router: Router,
    private settings: CoreService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token === undefined || this.token == '') {
      this.router.navigate(['/authentication/side-login']);
    }
  }

  verifyEmail(): void {
    if (this.token != '') {
      this.authService.verifyEmail(this.token).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['/authentication/side-login']);
          }
        },
        (error) => {
          this.router.navigate(['/authentication/side-login']);
        }
      );
    }
  }
}
