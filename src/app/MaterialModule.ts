import { NgModule } from '@angular/core';
// Material Popups & Modals
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  exports: [
    MatSnackBarModule,
    MatCardModule
  ],
})
export class MaterialModule {}
