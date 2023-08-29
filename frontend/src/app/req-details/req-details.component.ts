import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { UserService } from '../services/user.service';
import { BuildingService } from '../services/building.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Building } from '../models/building';
import { Job } from '../models/job';

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.css']
})
export class ReqDetailsComponent implements OnInit {

  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  isLoading: boolean = true;
  logged: User;
  client: User;
  building: Building;
  offer: number = 0;

  constructor(private jobService: JobService, private userService: UserService,
    private buildService: BuildingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 1) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      let jobId = this.route.snapshot.paramMap.get("id");
      this.canvasElement = document.getElementById('canvasElement') as HTMLCanvasElement;
      this.context = this.canvasElement.getContext('2d');
      this.jobService.getJobById(jobId).subscribe((request: Job) => {
        this.userService.getUser(request.client).subscribe((usr: User) => {
          this.client = usr;
          this.buildService.getBuilding(request.buildId).subscribe((build: Building) => {
            this.building = build
            this.redraw()
            this.isLoading = false;
          })
        })
      })
    }
  }

  redraw() {
    // Ponovno crtanje skice
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.building.rooms.forEach(room => {
      this.context.save();
      this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
      this.context.lineWidth = 3;
      this.context.strokeRect(room.x, room.y, room.width, room.height);
      this.context.fillStyle = room.color;
      this.context.fillRect(room.x + 1, room.y + 1, room.width - 1.5, room.height - 1.5);
    });

    this.building.doors.forEach(door => {
      this.context.save();
      this.context.fillStyle = 'rgba(181, 101, 29, 0.9)';
      this.context.fillRect(door.x, door.y, 20, 20);
    });
  }

  sendOffer() {
    let jobId = this.route.snapshot.paramMap.get("id");
    this.jobService.setOffer(jobId, this.offer).subscribe((response) => {
      if(response['status'] == 'ok') this.router.navigate(['/agenJobs'])
    })
  }

  refuse() {
    let jobId = this.route.snapshot.paramMap.get("id");
    this.jobService.agencyRefuse(jobId).subscribe((response) => {
      if(response['status'] == 'ok') this.router.navigate(['/agenJobs'])
    })
  }
}
