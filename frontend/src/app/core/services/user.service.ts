import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../shared/models/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<User | null>(null);
  accountData$ = this.userDataSubject.asObservable();

  updateUserData(userData: User): void {
    this.userDataSubject.next(userData);
  }

  getUserData(): User | null {
    return this.userDataSubject.value;
  }
}
