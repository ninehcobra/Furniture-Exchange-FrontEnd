import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class="d-flex align-items-center justify-content-end">
      <button
        mat-button
        mat-stroked-button
        color="warn"
        [mat-dialog-close]="false"
      >
        Cancel
      </button>
      <button
        mat-button
        mat-flat-button
        color="primary"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
