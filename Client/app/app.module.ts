import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { routing, appRoutingProviders } from './app.routes';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from  './components/home/home.component';
import { LoginComponent } from  './components/login/login.component';
import { RegisterComponent } from  './components/register/register.component';
import { AboutComponent } from  './components/about/about.component';
import { HeaderComponent } from  './components/header/header.component';

import { Services } from './shared/services/all.services'

import { FoodModule } from './components/food/food.module'

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
        FormsModule,
        FoodModule
    ],

    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AboutComponent,
        HeaderComponent
    ],

    providers: [
        appRoutingProviders,
        Services.allServices
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }