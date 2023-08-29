import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Job } from '../models/job';
import { BuildingService } from '../services/building.service';
import { Review } from '../models/review';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cli-jobs',
  templateUrl: './cli-jobs.component.html',
  styleUrls: ['./cli-jobs.component.css']
})
export class CliJobsComponent implements OnInit {

  @ViewChild('reviewForm') myForm: NgForm;

  requests: boolean = false;
  working: boolean = false;
  finished: boolean = false;

  isLoading: boolean = true;
  logged: User;
  allMyJobs: Job[];
  allMyReviews: Review[]

  hasReview: boolean = false;
  rating: number;
  comment: string;
  reviewJobId: number;
  reviewAgency: string;
  reviewSuccess: boolean = false;

  constructor(private jobService: JobService, private router: Router, private buildService: BuildingService, private userService: UserService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 0) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      this.jobService.getClientJobs(this.logged.username).subscribe((jobs: Job[]) => {
        this.allMyJobs = jobs
        this.userService.getReviews(this.logged.username).subscribe((reviews: Review[]) => {
          this.allMyReviews = reviews
          this.isLoading = false;
        })
      })
    }
  }

  reset() {
    this.reviewSuccess = false
    this.myForm.resetForm();
  }

  fill(job) {
    this.reviewJobId = job.jobId;
    this.reviewAgency = job.agency;
    for(let review of this.allMyReviews) {
      if(review.jobId == this.reviewJobId) {
        this.hasReview = true;
        this.rating = review.rating;
        this.comment = review.comment;
        return;
      }
    }
    this.hasReview = false;
    this.rating = 0;
    this.comment = ""
  }

  review() {
    if(this.hasReview) {
      this.userService.updateReview(this.reviewJobId, this.rating, this.comment).subscribe((response) => {
        if(response['status'] == "ok") {
          this.ngOnInit();
          this.reviewSuccess = true;
        }
      })
    }
    else {
      this.userService.leaveReview(this.reviewAgency, this.logged.username, this.rating, this.comment, this.reviewJobId).subscribe((response) => {
        if(response['status'] == "ok") {
          this.ngOnInit();
          this.reviewSuccess = true;
        }
      })
    }
  }

  filter() {
    if(this.requests || this.working || this.finished) {
      this.isLoading = true;
      this.jobService.getClientJobs(this.logged.username).subscribe((jobs: Job[]) => {
        this.allMyJobs = jobs;
        switch ((this.requests ? 4 : 0) | (this.working ? 2 : 0) | (this.finished ? 1 : 0)) {
          case 0: break;
          case 1: {
            this.allMyJobs = this.allMyJobs.filter(job => job.status == "finished");
            break;
          }
          case 2: {
            this.allMyJobs = this.allMyJobs.filter(job => job.status == "working");
            break;
          }
          case 3: {
            this.allMyJobs = this.allMyJobs.filter(job => job.status == "finished" || job.status == "working");
            break;
          }
          case 4: {
            this.allMyJobs = this.allMyJobs.filter(job => job.status == "request" || job.status == "reqAccept" || job.status == "reqRefuse");
            break;
          }
          case 5: {
            this.allMyJobs = this.allMyJobs.filter(job => job.status == "request" || job.status == "reqAccept" || job.status == "reqRefuse" || job.status == "finished");
            break;
          }
          case 6: {
            this.allMyJobs = this.allMyJobs.filter(job => job.status == "request" || job.status == "reqAccept" || job.status == "reqRefuse" || job.status == "working");
            break;
          }
          case 7: break;
        }
        this.isLoading = false;
      })
    }
  }

  refuse(id) {
    this.jobService.clientRefuse(id).subscribe((response) => {
      if(response['status'] == "ok") this.ngOnInit()
    })
  }

  accept(job) {
    this.jobService.clientAccept(job.jobId).subscribe((response) => {
      if(response['status'] == "ok") {
        this.buildService.colorAllRooms(job.buildId, "rgba(233, 211, 109, 1.00)").subscribe((response) => {
          if(response['status'] == "ok") this.ngOnInit();
        })
      }
    })
  }

  goToJobDetails(id) {
    this.router.navigate(['/jobDetails', {id: id}]);
  }

  finish(job) {
    this.jobService.clientFinish(job.jobId).subscribe((response) => {
      if(response['status'] == "ok") {
        this.buildService.colorAllRooms(job.buildId, "white").subscribe((response) => {
          if(response['status'] == "ok") this.ngOnInit();
        })
      }
    })
  }

}
