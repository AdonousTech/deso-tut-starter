import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        ScrollingModule
    ],
    exports: [
        MatDialogModule,
        ScrollingModule
    ]
})
export class CustomMaterialModule
{
}
