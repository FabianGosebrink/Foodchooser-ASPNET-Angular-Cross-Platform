import { AccountRoutes } from './account.routes';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AccountRoutes
    ],

    declarations: [
        LoginComponent,
        RegisterComponent
    ],

    providers: [
    ]
})

export class AccountModule { }
