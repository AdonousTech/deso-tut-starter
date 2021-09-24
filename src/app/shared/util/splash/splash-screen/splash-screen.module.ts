import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashScreenService } from './splash-screen.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SplashScreenModule {
  constructor(private _splashScreenService: SplashScreenService) {}
}
