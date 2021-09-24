import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagedAuthComponent } from './managed-auth.component';

const routes: Routes = [
  {
    path: '',
    component: ManagedAuthComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManagedAuthRoutingModule { }
