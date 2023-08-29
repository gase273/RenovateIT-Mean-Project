import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  isLoading: boolean = true;
  logged: User;
  allJobs: Job[];

  constructor(private router: Router, private jobService: JobService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"))
    if(!this.logged || this.logged.type != 2) this.router.navigate(['']);
    else {
      this.jobService.getAllJobs().subscribe((jobs: Job[]) => {
        this.allJobs = jobs;
        this.isLoading = false;
      })
    }

  }

  delJob(id) {
    this.jobService.delJob(id).subscribe((response) => {
      if(response['status'] == "ok") {
        this.ngOnInit();
      }
    })
  }

  goToJobDetails(id) {
    this.router.navigate(['/jobDetails', {id: id}]);
  }
}
