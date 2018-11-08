import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Poll } from '../../interfaces/poll';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-add',
  templateUrl: './poll-add.component.html',
  styleUrls: ['./poll-add.component.css']
})
export class PollAddComponent implements OnInit {

  user: User;
  
  pollForm = this.fb.group({
    title: ['',Validators.required],
    items: this.fb.array([
      this.fb.control('',[Validators.required]),
      this.fb.control('',[Validators.required])
    ])
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,  
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.navState$.subscribe( (user)=> {
      this.user = user;             
    });
    console.log('pollForm',this.pollForm);
  }

  addPoll(){
    
    const poll: Poll = {
      title: this.pollForm.get('title').value,
      user: [this.user.id,this.user.username],
      items: this.getItemsArray(this.items.value)
    }   
    this.db.addPoll(poll).subscribe((msg) => {
      console.log(msg);
      this.router.navigate(['polls/' + this.user.id]); 
    },err => {
      console.error(err);
    })
  }

  addItem(){
    this.items.push(this.fb.control('',[Validators.required]));    
  }

  removeItem(){    
    const index = this.items.length - 1;
    if (index < 2) return;
    this.items.removeAt(index);
  }

  getItemsArray(items: Array<string>){
    var mItems = [];
    items.forEach(item => {
      mItems.push({
        name: item,
        votes: []
      })
    })
    return mItems;
  }

  get items(){
    return this.pollForm.get('items') as FormArray;
  }

}
