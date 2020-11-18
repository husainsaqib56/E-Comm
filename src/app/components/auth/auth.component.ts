import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from '../../services/api.service';
import { ILoginModel } from '../models/productList.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private apiService: ApiService, private route: Router, private userService: UserService, private toastr: ToastrService) { }

  username: string; // holds the username
  password: string; // holds the password

  ngOnInit(): void { }

  // calls to login
  onLogin(): void {

    if (this.username === undefined && this.password === undefined) {
      this.toastr.error('Please enter a username and password', 'Oops!');
    }
    else {
      this.apiService.login(this.username, this.password).subscribe((res: ILoginModel) => {
        const token = res.accessToken;
        const userName = res.username;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        this.route.navigate(['../home']);
        this.toastr.success('Successfully', 'Logged in');
        if (res.accessToken) {
          this.userService.loggedInUser(userName);
        }
      });
    }
  }

}
