import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  modalRef: BsModalRef;
  user: User;

  constructor(
    private modalService: BsModalService,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.auth.navState$.subscribe( (user)=> {
      this.user = user;             
    });   

    this.afAuth.user.subscribe((state) => {            
      if (state && !this.user){    
        //console.log('state',state)    
        this.user = {id: state.uid, email: state.email, username: state.displayName};
        this.auth.navStateSource.next(this.user);
        this.auth.user = this.user;
      }            
    })    
  }

  openModal(template: TemplateRef<any>) {    
    this.auth.loginTwitter();
  }

  logOut(){    
    this.auth.logout();
  }

}
