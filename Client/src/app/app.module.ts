import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        AppRoutes,
        HttpClientModule,
        FormsModule,
        HomeModule,
        LayoutModule,

        SharedModule
    ],

    declarations: [
        AppComponent
    ],

    providers: [],

    bootstrap: [AppComponent]
})

export class AppModule { }
