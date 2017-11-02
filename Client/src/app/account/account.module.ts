import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccountRoutes } from './account.routes';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
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
