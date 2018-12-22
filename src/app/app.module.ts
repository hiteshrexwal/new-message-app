import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { CommonModule } from "@angular/common"
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PopoverModule, WavesModule,MDBBootstrapModule  } from 'angular-bootstrap-md';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { SidebarComponent } from './messageui/sidebar/sidebar.component';
import { MessagebarComponent } from './messageui/messagebar/messagebar.component';
import { NavComponent } from './messageui/sidebar/nav/nav.component';
import { MessageboxComponent } from './messageui/sidebar/messagebox/messagebox.component';
import { NavbarComponent } from './messageui/messagebar/navbar/navbar.component';
import { MessageuiComponent } from './messageui/messageui.component';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';
import { WelcomeComponent } from './messageui/welcome/welcome.component';

 
const config: SocketIoConfig = { url: 'https://new-message-app.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MessagebarComponent,
    NavComponent,
    MessageboxComponent,
    NavbarComponent,
    MessageuiComponent,
    LoginComponent,
    LoadingComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    HttpModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    WavesModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path:'',component:LoadingComponent},
      { path:'login',component:LoginComponent},
      { path:'messages',component:MessageuiComponent}
    ]),
    SocketIoModule.forRoot(config) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
