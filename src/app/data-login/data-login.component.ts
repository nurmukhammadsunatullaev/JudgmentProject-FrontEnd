import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../data-services/token-storage.service";
import {AuthService} from "../data-services/auth.service";

@Component({
  selector: 'app-data-login',
  templateUrl: './data-login.component.html',
  styleUrls: ['./data-login.component.css']
})
export class DataLoginComponent implements OnInit {


  loginForm:FormGroup;
  errorMessage:string;

  constructor(private builder:FormBuilder,private tokenStorage : TokenStorageService,private authService:AuthService ,public dialogRef: MatDialogRef<DataLoginComponent>, private http:HttpClient) { }

  public ngOnInit() : void {
    this.loginForm=this.builder.group({
      username:[null,[Validators.required]],
      password:[null,[Validators.required]],
    });
  }

  public login() : void{
    if(this.loginForm.valid){
      this.authService.loginRequest(this.loginForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.dialogRef.close(true);
          //
          // this.isLoginFailed = false;
          // this.isLoggedIn = true;
          // this.roles = this.tokenStorage.getAuthorities();
          // this.reloadPage();
        },
        error => {
          // console.log(error);
             this.errorMessage = error.error.message;
          // this.isLoginFailed = true;
        }
      );

    }
  }

  public close() :void {
    this.dialogRef.close();
  }
}
