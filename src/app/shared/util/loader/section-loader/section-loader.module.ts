import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SectionLoaderComponent } from './section-loader.component';



@NgModule({
  declarations: [
    SectionLoaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SectionLoaderComponent
  ]
})
export class SectionLoaderModule { }
