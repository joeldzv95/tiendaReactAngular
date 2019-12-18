import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user={}
  constructor(
    private titleService : Title,
    private authService : AuthService,
    private router : Router
  ) { 
    this.titleService.setTitle('SignIn')
  }

  ngOnInit() {
  }

  signin(){
    this.authService.singin(this.user)
      .subscribe(
        res =>{
          console.log(res)
          localStorage.setItem('token' , res.token)
          this.router.navigate(['/shop'])
        },
        err => console.log(err)
      )
  }

}
