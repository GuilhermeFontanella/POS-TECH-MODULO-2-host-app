import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostPageComponent } from './host-page.component';

const routes: Routes = [
  {path: '', component: HostPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostPageRoutingModule { }
