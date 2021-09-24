import { NgModule } from '@angular/core';
import { RouterModule,
         Routes } from '@angular/router';
import { CanonicalErrorComponent } from './canonical-error.component';

const routes: Routes = [
  {
    path: '',
    component: CanonicalErrorComponent
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
export class CanonicalErrorRoutingModule { }
