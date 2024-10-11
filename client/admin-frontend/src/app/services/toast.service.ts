import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 2000) {
    this.show(message, 'success-snackbar', duration);
  }

  showError(message: string, duration: number = 2000) {
    this.show(message, 'error-snackbar', duration);
  }

  private show(message: string, panelClass: string, duration: number) {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: [panelClass],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    };
    this.snackBar.open(message, 'Close', config);
  }
}
