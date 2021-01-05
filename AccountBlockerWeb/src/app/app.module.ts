import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from 'src/Service/alert.service';
import { HomeComponent } from './home/home.component';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MultiUserAlertComponent } from './multiUserAlert/multiUserAlert.component';
import { MultiAccountErrorComponent } from './multiAccountError/multiAccountError.component';

// const config: SocketIoConfig = { url: 'http://localhost:3000',options:{} };
@NgModule({
  declarations: [									
    AlertComponent,	
    AppComponent,
    LoginComponent,
    RegisterComponent,
      HomeComponent,
      MultiUserAlertComponent,
      MultiAccountErrorComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
