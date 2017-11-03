import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutRoutes } from './about.routes';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutes
    ],

    declarations: [
        AboutComponent
    ],

    providers: [
    ]
})

export class AboutModule { }
