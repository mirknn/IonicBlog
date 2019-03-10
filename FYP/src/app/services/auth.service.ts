import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { logging } from 'protractor';

export interface User {
  name: string;
  roles: string[];
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

    constructor() { }

  login(name){
    if (name=='Lisa') {
      this.currentUser.next({
        name: 'User',
        roles: ['read-content','user']
      });
    } else if (name =='Admin') {
      this.currentUser.next({
        name: 'Admin',
        roles: ['read-content', 'admin']
      });
    }
  }

  getUserSubject() {
    return this.currentUser.asObservable();
  }

  logout() {
    this.currentUser.next(null);
  }

  hasRoles(roles: string[]): boolean {
    for (const oneRole of roles){
      if (!this.currentUser || !this.currentUser.value.roles.includes(oneRole)){
        return false;
      }
    }

    return true;
  }
}
