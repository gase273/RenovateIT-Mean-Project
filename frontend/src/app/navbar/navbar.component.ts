import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  logged: User
  route: string

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"))
    this.route = this.router.url
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate([''])
  }

  back() {
    if (this.router.url == '/registerClient' || this.router.url == '/registerAgency' || this.router.url == '/reset') this.router.navigate(['/login'])
    else if (this.router.url == '/addBuilding' || this.router.url.split(';')[0] == '/editBuilding') this.router.navigate(['/cliBuildings'])
    else if (this.router.url.split(';')[0] == '/agencyDetails' && this.logged) this.router.navigate(['/cliAgencies'])
    else if (this.router.url.split(';')[0] == '/requestJob') this.router.navigate(['/agencyDetails', {username: this.router.url.split('=')[1]}])
    else if (this.router.url.split(';')[0] == '/reqDetails') this.router.navigate(['/agenJobs'])
    else if (this.router.url.split(';')[0] == '/jobDetails' && this.logged.type == 0) this.router.navigate(['/cliJobs'])
    else if (this.router.url.split(';')[0] == '/jobDetails' && this.logged.type == 1) this.router.navigate(['/agenJobs'])
    else if (this.router.url.split(';')[0] == '/jobDetails' && this.logged.type == 2) this.router.navigate(['/adminJobs'])
    else if (this.router.url.split(';')[0] == '/userDetails' || this.router.url == '/addAgency' || this.router.url == '/addClient') this.router.navigate(['/admin'])
    else this.router.navigate([''])
  }

}
