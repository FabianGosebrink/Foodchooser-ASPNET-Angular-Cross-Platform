import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HomeRoutes } from './home.routes';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutes,
        HttpClientModule,
        FormsModule
    ],

    declarations: [
        HomeComponent
    ],

    providers: [

    ]
})

export class HomeModule { }
