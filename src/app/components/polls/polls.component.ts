import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Poll } from '../../interfaces/poll';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  polls: Array<Poll>;
  
  constructor(private db: DatabaseService) { }


  ngOnInit() {
    this.db.getPolls().subscribe(polls => {
      this.polls = polls;
      console.log('polls',polls)
    })
  }

}
