import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],

    declarations: [
        HeaderComponent
    ],

    providers: [
    ],

    exports: [
        HeaderComponent
    ]
})

export class LayoutModule { }
