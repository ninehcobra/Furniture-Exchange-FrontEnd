import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IErrorResponse } from '../models/error.model';
import { SPECIAL_ERRORS } from 'src/constants/special-error.constant';

const EXCLUDED_TOAST_APIS = [
  '/api/chat-bots/check-domain',
  // Add more endpoints as needed
];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService // Assuming you have an AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        const apiError = error.error as IErrorResponse;

        const shouldShowToast = !EXCLUDED_TOAST_APIS.some((api) =>
          request.url.includes(api)
        );

        switch (error.status) {
          case 400:
            errorMessage = apiError.message;

            switch (apiError.error) {
              case SPECIAL_ERRORS.EMAIL_EXIST:
                errorMessage =
                  'Your email already exists in our system. Please login or use a different email.';
                break;

              case SPECIAL_ERRORS.EMAIL_NOT_VERIFIED:
                this.router.navigate(['/authentication/verify-email']);
                break;
            }

            break;
          case 401:
            errorMessage = 'Session expired. Please login again.';
            this.authService.logout(); // Clear token and user data
            this.router.navigate(['/authentication/side-login']);

            break;
          case 403:
            errorMessage = 'You do not have permission to access this resource';

            break;
          case 404:
            errorMessage = 'The requested resource was not found';

            break;
          case 500:
            errorMessage = 'Internal Server Error. Please try again later';

            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        if (shouldShowToast) {
          this.toastService.showError(errorMessage);
        }

        return throwError(errorMessage);
      })
    );
  }
}
