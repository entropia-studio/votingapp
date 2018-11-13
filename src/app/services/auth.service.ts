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
  
  public userState = new Subject<User>();  
  userState$ = this.userState.asObservable();

  constructor(
    public afAuth: AngularFireAuth,        
  ){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (!this.user){
      this.subscribeAngularFireAuthState();
    }    
  }
  
  subscribeAngularFireAuthState(){
    // Check the auth state
    this.afAuth.user.subscribe((state) => {            
      if (state){               
        this.user = {
          id: state.uid,
          email: state.email,
          username: state.displayName,         
        };
        
        sessionStorage.setItem('user',JSON.stringify(this.user));        
        this.userState.next(this.user);
      }            
    })
  }

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
        email: oAuthLoginObj.user.email,       
      }
      
      sessionStorage.setItem('user',JSON.stringify(this.user));    
      this.userState.next(this.user);        
    });          
  }

  logout() {
    this.afAuth.auth.signOut();
    sessionStorage.removeItem('user');
    this.user = undefined;
    this.userState.next(this.user); 
  }

}
