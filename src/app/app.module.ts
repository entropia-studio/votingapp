import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PollsComponent } from './components/polls/polls.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule }    from '@angular/common/http';
import { PollDetailComponent } from './components/poll-detail/poll-detail.component';

import { GooglePieChartService } from './services/google-pie-chart.service';
import { PiechartComponent } from './components/piechart/piechart.component';



@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    FooterComponent,
    PollsComponent,
    NotFoundComponent,
    PollDetailComponent,
    PiechartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GooglePieChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
