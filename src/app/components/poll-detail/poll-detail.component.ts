import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from 'src/app/interfaces/poll';
import { DatabaseService } from '../../services/database.service';
import { PieChartConfig } from '../../interfaces/pie-chart-config';
import { ColorService } from '../../services/color.service';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-poll',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.css']
})
export class PollDetailComponent implements OnInit {

  poll: Poll;
  pollFormValid: boolean = false;
  errors: boolean = false;
  colors: Array<string>;
  item_custom_text: string = 'Type your own option';

  pollForm = this.fb.group({    
    item: [''],
    item_custom: [this.item_custom_text],    
  })

  data1: any[];
  config1: PieChartConfig;
  elementId1: String;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,      
    private db: DatabaseService,
    private colorService: ColorService,
    private fb: FormBuilder,    
  ) {}

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
    
    // Get the slice colours
    this.colors = this.colorService.getColours(this.poll.items.length);
    this.config1 = new PieChartConfig('', 0.4,this.colors);
    this.elementId1 = 'pieChart';
  }

  updatePoll(){        
    var item_num = +this.pollForm.value.item; 
    // User not logged can vote
    var user_id = this.auth.user !== null ? this.auth.user.id : 'anonymousUser';   
    // User check Custom item, last option. Must have a text value.
    switch(item_num){
      case this.poll.items.length:
        this.setPollCustomItem(user_id);
        break;
      default:
      this.setPoll(item_num, user_id);
    }
    
    this.db.updatePoll(this.poll).subscribe((poll) => {      
      this.setConfigChart(poll); 
    })
  }  

  setPoll(item_num: number, user_id: string){
    if ('votes' in this.poll.items[item_num]){
      this.poll.items[item_num].votes.push(user_id);
    }else{
      this.poll.items[item_num].votes = [user_id];
    }   
  }

  setPollCustomItem(user_id: string){
    var item_custom = this.pollForm.get('item_custom').value;
    // Check if the item_custom has any value    
    if (item_custom == '') {
      this.errors = true;
      return;
    }else{
      this.errors = false;
    }        
    
    this.item_custom.setValue(this.item_custom_text);

    this.poll.items.push({
      name: item_custom,
      votes: [user_id]
    })
    
  }

  checkCustomItem(){
    if (this.item_custom.value == this.item_custom_text){
      this.item_custom.setValue('');
      this.pollFormValid = false;
    }else{
      this.item_custom.setValue(this.item_custom.value);
      this.pollFormValid = true;
    }
  }

  get items(){
    return this.pollForm.get('items') as FormArray;
  }

  get item_custom(){
    return this.pollForm.get('item_custom') as FormControl;
  }

}
