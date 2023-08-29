import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css']
})
export class AgencyDetailsComponent implements OnInit {

  logged: User
  agency: User = new User

  isLoading: boolean = true;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let user = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(user).subscribe((result: User) => {
      this.agency = result;
      this.isLoading = false;
    })
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
  }


  goToRequest() {
    this.router.navigate(['/requestJob', {username: this.agency.username}]);
  }
}
