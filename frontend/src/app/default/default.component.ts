import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  logged: User;
  isLoading: boolean = true;
  allAgencies: User[];

  name: boolean = true;
  address: boolean = false;
  order: string = "";
  text: string  = "";

  constructor(private usrService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    this.usrService.getAgencies().subscribe((agencies: User[]) => {
      this.allAgencies = agencies;
      this.isLoading = false;
    })
  }

  search() {
    this.isLoading = true;
    this.usrService.getAgencies().subscribe((agencies: User[]) => {
      this.allAgencies = agencies
      if(this.name && this.address) this.allAgencies = this.allAgencies.filter(user => user.agencyName.includes(this.text) || user.address.includes(this.text))
      else if (this.name) this.allAgencies = this.allAgencies.filter(user => user.agencyName.includes(this.text))
      else this.allAgencies = this.allAgencies.filter(user => user.agencyName.includes(this.text))
      if(this.order == "asc") this.allAgencies.sort((a, b) => {
        if(this.name && this.address) {
          if(a.agencyName === b.agencyName) {
            return  a.address <= b.address ? -1 : 1
          }
          else return a.agencyName <= b.agencyName ? -1 : 1
        }
        else if (this.name) {
          return a.agencyName <= b.agencyName ? -1 : 1
        }
        else return a.address <= b.address ? -1 : 1
      })
      if(this.order == "desc") this.allAgencies.sort((a, b) => {
        if(this.name && this.address) {
          if(a.agencyName === b.agencyName) {
            return  a.address >= b.address ? -1 : 1
          }
          else return a.agencyName >= b.agencyName ? -1 : 1
        }
        else if (this.name) {
          return a.agencyName >= b.agencyName ? -1 : 1
        }
        else return a.address >= b.address ? -1 : 1
      })
      this.isLoading = false;
    })
  }

  changeSelect(event: any) {
    if(event.target.id == "asc" && this.order == "asc") this.order = ""
    else if (event.target.id == "desc" && this.order == "desc") this.order = ""
    else if(event.target.id == "asc") this.order = "asc"
    else if (event.target.id == "desc") this.order = "desc"
  }

  goToDetails(username) {
    this.router.navigate(['/agencyDetails', {username: username}]);
  }
}
