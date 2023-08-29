import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Job } from '../models/job';

@Component({
  selector: 'app-agen-jobs',
  templateUrl: './agen-jobs.component.html',
  styleUrls: ['./agen-jobs.component.css']
})
export class AgenJobsComponent implements OnInit {


  isLoading: boolean = true;
  logged: User;
  jobRequests: Job[];
  jobsInProgress: Job[];

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"))
    if(!this.logged || this.logged.type != 1) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      this.jobService.getAgentRequests(this.logged.username).subscribe((requests: Job[]) => {
        this.jobRequests = requests
        this.jobService.getAgentWorking(this.logged.username).subscribe((working: Job[]) => {
          this.jobsInProgress = working
          this.isLoading = false;
        })
      })
    }
  }

  goToReqDetails(id) {
    this.router.navigate(['/reqDetails', {id: id}]);
  }

  goToJobDetails(id) {
    this.router.navigate(['/jobDetails', {id: id}]);
  }

}
