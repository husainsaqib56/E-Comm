import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  userName: string; // holds username
  IsAuthenticated: boolean; // boolean to check if user is authenticated
  loginUser: string; // holds the value of the logged in user
  IsLoggedIn: Subscription; // holds the subscription of the Login method

  constructor(private userService: UserService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.IsLoggedIn = this.userService.isLoggedIn.subscribe((res) => {
      this.loginUser = res;
      this.checkAuthentication();
    });

    this.userName = localStorage.getItem('userName');
    if (this.userName || this.loginUser) {
      this.IsAuthenticated = true;
    }
  }

  // calls to check the Authentication
  checkAuthentication(): void {
    if (this.userName || this.loginUser) {
      this.IsAuthenticated = true;
    }
  }

  // calls to Logout
  onLogout(): void {
    localStorage.clear();
    this.IsAuthenticated = false;
    this.toastr.success('Successfully', 'Logout');
  }

  showCartItem(): void {
    // const token = localStorage.getItem('token');
    if (this.userName) {
      this.route.navigate(['home/cart']);
    }
    else {
      this.toastr.warning('Login', 'You Need to');
    }
  }

  // calls to unsubscribe the SubscriptionF
  ngOnDestroy(): void {
    this.IsLoggedIn.unsubscribe();
  }

}
