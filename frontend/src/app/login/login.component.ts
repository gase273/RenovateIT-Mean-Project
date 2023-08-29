import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  loginFail: boolean = false
  errMsg: string = ""

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if(user != null) {
        if(user.status == "accepted") {
          sessionStorage.setItem("loggedIn", JSON.stringify(user));
          if (user.type == 0) this.router.navigate(['client']);
          else if (user.type == 1) this.router.navigate(['agency']);
          else this.router.navigate(['admin']);
        }
        else {
          this.loginFail = true;
          this.errMsg = user.status == "awaiting" ? "Vaš zahtev za registraciju još uvek nije odobren." : "Vaš zahtev za registraciju je odbijen."
        }
      }
      else {
        this.loginFail = true;
        this.errMsg = "Pogrešno uneti kredencijali!"
      }
    })
  }

}
