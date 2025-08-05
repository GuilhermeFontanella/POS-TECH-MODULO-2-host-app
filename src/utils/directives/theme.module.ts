import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeApplierDirective } from './theme-applier.directive'; // ajuste conforme a estrutura

@NgModule({
  declarations: [ThemeApplierDirective],
  exports: [ThemeApplierDirective],
  imports: [CommonModule]
})
export class ThemeDirectiveModule {}
