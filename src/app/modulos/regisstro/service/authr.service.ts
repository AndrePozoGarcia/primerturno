import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
import { merge } from 'rxjs';

interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthrService {
  userData:any
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { /*
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.userData=user;
        localStorage.setItem('user',JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!)
      }else{
        localStorage.setItem('user','null');
        JSON.parse(localStorage.getItem('user')!)
      }
    }) */
  }
  setUserData(user:any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      'user/${user.uid}'
    )
    const userData: User = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(userData,{
      merge:true
    });
  }

  register(email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    .then(result=>{
      this.setUserData(result.user);
    }).catch(()=>{})
  }
}
