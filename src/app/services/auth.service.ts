import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { Subject } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;  

  constructor(
    public afAuth: AngularFireAuth,        
  ) { }
  
  
  // Communication with the menu
  public navStateSource = new Subject<User>();
  navState$ = this.navStateSource.asObservable();

  login(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);      
  }

  emailSignup(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);        
  }

  loginTwitter(): void {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider()).then(oAuthLoginObj => {      
      
      this.user = {
        id: oAuthLoginObj.user.uid,
        username: oAuthLoginObj.user.displayName,        
        email: oAuthLoginObj.user.email
      }
      
      //Add or rewrite the user to the document
      //this.firebaseService.addUser(this.user);
      this.navStateSource.next(this.user);        
    });          
  }

  logout() {
    this.afAuth.auth.signOut();
    this.user = undefined;
    this.navStateSource.next(this.user); 
  }

}
