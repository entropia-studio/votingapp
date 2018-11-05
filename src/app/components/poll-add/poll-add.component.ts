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
      this.fb.control('123'),
      this.fb.control('456')
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
  }

  addPoll(){
    
    const poll: Poll = {
      title: this.pollForm.get('title').value,
      user: [this.user.id,this.user.username],
      items: this.items.value
    }   
    this.db.addPoll(poll).subscribe((msg) => {
      console.log(msg);
      this.router.navigate(['polls/' + this.user.id]); 
    },err => {
      console.error(err);
    })
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
