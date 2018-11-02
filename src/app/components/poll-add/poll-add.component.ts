import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Poll } from '../../interfaces/poll';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-poll-add',
  templateUrl: './poll-add.component.html',
  styleUrls: ['./poll-add.component.css']
})
export class PollAddComponent implements OnInit {

  pollForm = this.fb.group({
    title: ['',Validators.required],
    items: this.fb.array([
      this.fb.control('123'),
      this.fb.control('456')
    ])
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,  
  ) { }

  ngOnInit() {
  }

  addPoll(){
    
    const poll = {
      title: this.pollForm.get('title'),
      user: [this.auth.user.id,this.auth.user.username]
    }
    
   
    console.log(poll);
  }

  addItem(){
    this.items.push(this.fb.control(''));    
  }

  removeItem(){    
    const index = this.items.length - 1;
    if (index < 2) return;
    this.items.removeAt(index);
  }

  get items(){
    return this.pollForm.get('items') as FormArray;
  }

}
