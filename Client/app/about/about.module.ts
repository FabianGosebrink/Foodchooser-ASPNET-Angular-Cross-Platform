import { AboutComponent } from './components/about/about.component';
import { AboutRoutes } from './about.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
