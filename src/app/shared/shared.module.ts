import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './custom-material';
import { PipesModule } from './pipes/pipes.module';
import { RouterModule } from '@angular/router';

import { CcPriceDisplayModule } from './financial/cc-price-display/cc-price-display.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        CcPriceDisplayModule,
        PipesModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        CcPriceDisplayModule,
        PipesModule,
        RouterModule
    ],
    declarations: [
    ]
})
export class SharedModule
{
}
