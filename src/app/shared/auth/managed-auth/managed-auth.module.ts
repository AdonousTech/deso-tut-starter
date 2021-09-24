import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagedAuthRoutingModule } from './managed-auth-routing.module';
import { ManagedAuthComponent } from './managed-auth.component';



@NgModule({
  declarations: [
    ManagedAuthComponent
  ],
  imports: [
    CommonModule,
    ManagedAuthRoutingModule
  ]
})
export class ManagedAuthModule { }
