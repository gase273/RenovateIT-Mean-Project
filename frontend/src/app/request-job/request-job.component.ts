import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { JobService } from '../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Building } from '../models/building';

@Component({
  selector: 'app-request-job',
  templateUrl: './request-job.component.html',
  styleUrls: ['./request-job.component.css']
})
export class RequestJobComponent implements OnInit {

  isLoading: boolean = true;
  logged: User
  agencyUsername: string = ""
  allClientBuilds: Building[] = [];
  selectedBuild: number;
  date: string;
  jobSuccess: boolean = false;

  constructor(private buildService: BuildingService, private jobService: JobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 0) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      this.agencyUsername = this.route.snapshot.paramMap.get("username");
      this.buildService.getClientBuildings(this.logged.username).subscribe((builds: Building[]) => {
        this.allClientBuilds = builds;
        this.selectedBuild = this.allClientBuilds[0].buildId;
        this.isLoading = false;
      })
    }
  }

  requestJob() {
    this.jobService.addJob(this.selectedBuild, this.logged.username, this.agencyUsername, this.date).subscribe((response) => {
      if(response['status'] == 'ok') this.jobSuccess = true;
    })
  }

}
