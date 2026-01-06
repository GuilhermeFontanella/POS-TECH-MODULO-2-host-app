import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeApplierDirective } from './theme-applier.directive'; // ajuste conforme a estrutura
import { THEME_PORT_LOADER } from 'src/app/ports/theme/themePortToken';
import { ThemeNgRxAdapter } from 'src/infra/themeAdapter';

@NgModule({
  declarations: [ThemeApplierDirective],
  exports: [ThemeApplierDirective],
  imports: [CommonModule],
  providers: [
    { provide: THEME_PORT_LOADER, useClass: ThemeNgRxAdapter }
  ]
})
export class ThemeDirectiveModule {}
