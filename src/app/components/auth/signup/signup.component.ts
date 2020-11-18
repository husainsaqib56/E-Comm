import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ISignupModel } from '../../models/productList.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private apiService: ApiService, private toastr: ToastrService) { }
  username: string;
  password: string;
  signUpResponse: ISignupModel;

  ngOnInit(): void {
  }

  signUp(): void {
    this.apiService.signup(this.username, this.password).subscribe((res: ISignupModel) => {
      this.signUpResponse = res;
      this.toastr.success('Sucessfully', 'Signup');
      console.log(this.signUpResponse);
      this.username = '';
      this.password = '';
    });
  }

}
