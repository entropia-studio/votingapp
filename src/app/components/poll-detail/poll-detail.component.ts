import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Poll } from 'src/app/interfaces/poll';
import { DatabaseService } from '../../services/database.service';
import { PieChartConfig } from '../../interfaces/pie-chart-config';

@Component({
  selector: 'app-poll',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent implements OnInit {

  poll: Poll;

  data1: any[];
  config1: PieChartConfig;
  elementId1: String;

  constructor(
    private route: ActivatedRoute,  
    private location: Location,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
    const idPoll = this.route.snapshot.paramMap.get('idPoll');
    this.db.getPoll(idPoll).subscribe(poll => {
      this.poll = poll;
      this.setConfigChart(poll);
    })    
  }

  setConfigChart(poll: Poll){
    //Piechart1 Data & Config
    this.data1 = [['Item', 'Votes']];
    
    poll.items.map(item => {
      if (Object.keys(item).indexOf('votes') !== -1){
        this.data1.push([item.name,item.votes.length]);        
      }else{
        this.data1.push([item.name,0]);        
      }
    })    
    console.log('this.data1',this.data1)
    this.config1 = new PieChartConfig(poll.title, 0.4);
    this.elementId1 = 'pieChart';
  }

  

}
