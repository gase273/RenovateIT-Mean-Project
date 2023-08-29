import { Component, OnInit} from '@angular/core';
import { JobService } from '../services/job.service';
import { UserService } from '../services/user.service';
import { BuildingService } from '../services/building.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Building } from '../models/building';
import { Job } from '../models/job';
import { WorkerService } from '../services/worker.service';
import { AgencyWorker } from '../models/worker';
import { RequestService } from '../services/request.service';
import { MyRequest } from '../models/myrequest';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  isLoading: boolean = true;
  hasRequest: boolean = false;
  request: MyRequest;
  logged: User;
  client: User;
  building: Building;
  myJob: Job
  availWorkers: AgencyWorker[];
  assignedWorkers: AgencyWorker[] = [];
  selectedWorker: AgencyWorker;

  reason: string;
  reqSuccess: boolean = false;

  currentRoomIndex: number = -1;
  greenRooms: number = 0;

  constructor(private jobService: JobService, private userService: UserService, private requestService: RequestService,
    private buildService: BuildingService, private route: ActivatedRoute, private workerService: WorkerService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      let jobId = this.route.snapshot.paramMap.get("id");
      this.canvasElement = document.getElementById('canvasElement') as HTMLCanvasElement;
      this.context = this.canvasElement.getContext('2d');
      this.jobService.getJobById(jobId).subscribe((job: Job) => {
        this.myJob = job
        this.userService.getUser(job.client).subscribe((user: User) => {
          this.client = user;
          this.buildService.getBuilding(job.buildId).subscribe((build: Building) => {
            this.building = build;
            for(let room of this.building.rooms) {
              if(room.color == "green") this.greenRooms++
            }
            this.redraw()
            this.workerService.getAllAvailable(job.agency).subscribe((workers: AgencyWorker[]) => {
              this.availWorkers = workers;
              this.selectedWorker = workers[0];
              this.workerService.getAllOnJob(jobId).subscribe((onJob: AgencyWorker[]) => {
                this.assignedWorkers = onJob;
                this.requestService.getCancelRequest(jobId).subscribe((req: MyRequest) => {
                  if(req) {
                    this.hasRequest = true;
                    this.request = req;
                  }
                  else {
                    this.hasRequest = false;
                    this.request = null;
                  }
                  this.isLoading = false;
                })
              })
            })
          })
        })
      })
    }
  }

  handleClick(event: MouseEvent) {

    for(let room of this.building.rooms) {
      if (event.offsetX > room.x && event.offsetX < room.x + room.width &&
        event.offsetY > room.y && event.offsetY < room.y + room.height
      ) {
        this.currentRoomIndex = this.building.rooms.indexOf(room);
        return;
      }
      else this.currentRoomIndex = -1;
    };
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

  assignWorker(worker) {
    this.assignedWorkers.push(worker);
    this.availWorkers.splice(this.availWorkers.indexOf(worker), 1);
    this.selectedWorker = this.availWorkers[0];
    if(this.assignedWorkers.length == this.building.rooms.length) {
      let counter = 0;
      this.buildService.colorAllRooms(this.building.buildId, 'red').subscribe((response1) => {
        if(response1['status'] == "ok") {
          for(let Worker of this.assignedWorkers) {
            this.workerService.assignWorker(this.myJob.jobId, Worker.workerId).subscribe((response2) => {
              if(response2['status'] == "ok") counter++;
              if(counter == this.building.rooms.length) this.ngOnInit()
            })
          }
        }
      });
    }
  }

  finishRoom() {
    this.buildService.colorOneRoom(this.building.buildId, "green", this.currentRoomIndex).subscribe((response1) => {
      if(response1['status'] == "ok") {
        this.greenRooms++
        if(this.greenRooms == this.building.rooms.length) {
          console.log('here');
          this.jobService.agencyFinish(this.myJob.jobId).subscribe((response2) => {
            if(response2['status'] == "ok") {
              this.workerService.releaseWorkers(this.myJob.jobId).subscribe((response4) => {
                if(response4['status'] == "ok") this.ngOnInit();
              })
            }
          })
        }
        else {
          this.greenRooms = 0;
          this.ngOnInit();
        }
      }
    })
  }

  addRequest() {
    this.requestService.addCancelRequest(this.logged.username, this.reason, this.myJob.jobId).subscribe((response) => {
      if(response['status'] == "ok") {
        this.reqSuccess = true;
        this.ngOnInit();
      }
    })
  }

  acceptRequest() {
    this.jobService.cancelJob(this.myJob.jobId).subscribe((response1) => {
      if(response1['status'] == "ok") {
        this.requestService.delCancelRequest(this.myJob.jobId).subscribe((response2) => {
          if(response2['status'] == "ok") {
            alert("Zahtev prihvaćen");
            this.ngOnInit();
          }
        })
      }
    })

  }

  refuseRequest() {
    this.requestService.delCancelRequest(this.myJob.jobId).subscribe((response) => {
      if(response['status'] == "ok") {
        alert("Zahtev odbijen");
        this.ngOnInit();
      }
    })
  }

}
