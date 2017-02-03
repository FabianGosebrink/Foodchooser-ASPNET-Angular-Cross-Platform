import { NeedsAuthentication } from './decorators/needsAuthentication';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [

    ],

    providers: [
        NeedsAuthentication
    ]
})

export class SharedModule { }
