import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionLoaderModule } from './section-loader';
import { RndBtnSubLoaderModule } from './rnd-btn-sub-loader/rnd-btn-sub-loader.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SectionLoaderModule,
    RndBtnSubLoaderModule
  ],
  exports: [
    SectionLoaderModule,
    RndBtnSubLoaderModule
  ]
})
export class LoadersModule { }
