import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollsComponent } from './components/polls/polls.component';
import { PollDetailComponent } from './components/poll-detail/poll-detail.component';
import { NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: PollsComponent },
  { path: 'polls' , component: PollsComponent},
  { path: 'polls/:userId' , component: PollsComponent},
  { path: 'poll/:id' , component: PollDetailComponent},
  { path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
