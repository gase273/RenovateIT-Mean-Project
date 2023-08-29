import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  logged: User;
  allUsers: User [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 2) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      this.userService.fetchUsersNoAdmin().subscribe((users: User[]) => {
        this.allUsers = users;
        this.isLoading = false;
      })
    }
  }

  goToDetails(user) {
    this.router.navigate(['/userDetails', {username: user}])
  }

  accept(user) {
    this.userService.setStatus(user, "accepted").subscribe((response) => {
      if(response['status'] == "ok") this.ngOnInit();
    })
  }

  refuse(user) {
    this.userService.setStatus(user, "denied").subscribe((response) => {
      if(response['status'] == "ok") this.ngOnInit();
    })
  }

  del(user) {
    this.userService.delUser(user).subscribe((response) => {
      if(response['status'] == "ok") this.ngOnInit();
    })
  }
}
