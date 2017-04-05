import { HomeRoutes } from './home.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutes,
        HttpModule,
        FormsModule
    ],

    declarations: [
        HomeComponent
    ],

    providers: [

    ]
})

export class HomeModule { }
