import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
    
  user: User;

  constructor(    
    private auth: AuthService,    
  ) {
      this.user = this.auth.user;
  }

  ngOnInit() {
    this.auth.userState$.subscribe( (user)=> {
      this.user = user;             
    });  
  }

  openModal(template: TemplateRef<any>) {    
    this.auth.loginTwitter();
  }

  logOut(){    
    this.auth.logout();
  }

}
