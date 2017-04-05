import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        HttpModule,
        FormsModule,
        HomeModule,
        LayoutModule,

        CoreModule,
        SharedModule
    ],

    declarations: [
        AppComponent
    ],

    providers: [],

    bootstrap: [AppComponent]
})

export class AppModule { }
