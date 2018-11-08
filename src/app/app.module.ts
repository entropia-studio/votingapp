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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { GooglePieChartService } from './services/google-pie-chart.service';
import { PiechartComponent } from './components/piechart/piechart.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


// ngx modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { PollAddComponent } from './components/poll-add/poll-add.component';
import { PiechartFooterComponent } from './components/piechart-footer/piechart-footer.component';



@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FooterComponent,
    PollsComponent,
    NotFoundComponent,
    PollDetailComponent,
    PiechartComponent,        
    PollAddComponent, PiechartFooterComponent,
    
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),    
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),   
    AngularFirestoreModule, 
    AngularFireAuthModule,    
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GooglePieChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
