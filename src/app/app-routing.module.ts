import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollsComponent } from './components/polls/polls.component';
import { PollDetailComponent } from './components/poll-detail/poll-detail.component';
import { NotFoundComponent} from './components/not-found/not-found.component';
import { PollAddComponent } from './components/poll-add/poll-add.component';


const routes: Routes = [
  { path: '', component: PollsComponent },  
  { path: 'polls' , component: PollsComponent},
  { path: 'polls/:idUser' , component: PollsComponent},
  { path: 'poll/new' , component: PollAddComponent},
  { path: 'poll/:idPoll' , component: PollDetailComponent},
  { path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
