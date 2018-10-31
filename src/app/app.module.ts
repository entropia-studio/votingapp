import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PollsComponent } from './components/polls/polls.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule }    from '@angular/common/http';
import { PollDetailComponent } from './components/poll-detail/poll-detail.component';

import { GooglePieChartService } from './services/google-pie-chart.service';
import { PiechartComponent } from './components/piechart/piechart.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';

// ngx modules

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PollAddComponent } from './components/poll-add/poll-add.component';



@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FooterComponent,
    PollsComponent,
    NotFoundComponent,
    PollDetailComponent,
    PiechartComponent,
    LoginComponent,    
    PollAddComponent,
    
  ],
  entryComponents: [LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),   
    AngularFirestoreModule, 
    AngularFireAuthModule,
    BsDropdownModule.forRoot()
  ],
  providers: [GooglePieChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
