import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Poll } from '../../interfaces/poll';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  polls: Array<Poll>;
  
  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,  
    ) { }


  ngOnInit() {
    const idUser = this.route.snapshot.paramMap.get('idUser');
    this.db.getPolls(idUser).subscribe(polls => {
      this.polls = polls;      
    })
  }

}
