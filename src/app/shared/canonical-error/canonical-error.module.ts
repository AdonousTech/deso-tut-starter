import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

import { CanonicalErrorComponent } from './canonical-error.component';
import { CanonicalErrorRoutingModule } from './canonical-error-routing.module';



@NgModule({
  declarations: [
    CanonicalErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CanonicalErrorRoutingModule
  ]
})
export class CanonicalErrorModule { }
