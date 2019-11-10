import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './routes/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './routes/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './routes/register/register.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { ChatComponent } from './routes/chat/chat.component';
import { ChatService } from 'src/app/services/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './routes/logout/logout.component';

const appRoutes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'logout', component: LogoutComponent },

  //the default page
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ChatComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ChatService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
