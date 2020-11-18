import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn = new BehaviorSubject<string>(null);

  // public loggedIn = this.isLoggedIn.asObservable();



  constructor() { }

  loggedInUser(username: string): void {
    this.isLoggedIn.next(username);
    // this.isLoggedIn.
  }
}
