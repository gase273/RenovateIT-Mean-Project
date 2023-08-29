import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Building } from '../models/building';
import { JobService } from '../services/job.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  isLoading: boolean = true;
  logged: User
  clientBuildings: Building[]
  greeting: string;

  constructor(private buildService: BuildingService, private jobService: JobService, private workerService: WorkerService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(this.logged && this.logged.type == 0)  {
      this.buildService.getClientBuildings(this.logged.username).subscribe((builds: Building[]) => {
        this.clientBuildings = builds;
        if(this.clientBuildings) this.greeting = "Svi Vaši objekti"
        else this.greeting = "Nemate nijedan sačuvan objekat"
        this.isLoading = false;
      })
    }
    else {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
  }

  goToEdit(id) {
    this.router.navigate(['/editBuilding', {id: id}]);
  }

  delete(id) {
    this.jobService.delJobs(id).subscribe((response2) => {
      if(response2['status'] == "ok") {
        this.buildService.removeClientBuilding(id).subscribe((response) => {
          if(response['status'] == "ok") {
            this.ngOnInit();
          }
        })
      }
    })
  }
}
