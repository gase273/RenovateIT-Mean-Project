import { Component, OnInit } from '@angular/core';
import { AgencyWorker } from '../models/worker';
import { Router } from '@angular/router';
import { WorkerService } from '../services/worker.service';
import { User } from '../models/user';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  isLoading: boolean = true;
  logged: User;
  allMyWorkers: AgencyWorker[];

  amount: number = 0;
  reqSuccess: boolean = false;

  newFirstName: string;
  newLastName: string;
  newEmail: string;
  newPhone: string;
  newSpecialty: string;
  newSuccess: boolean = false;

  editId: number;
  editFirstName: string;
  editLastName: string;
  editEmail: string;
  editPhone: string;
  editSpecialty: string;
  editSuccess: boolean = false;

  constructor(private router: Router, private workerService: WorkerService, private requestService: RequestService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 1) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      this.workerService.getAllFromAgency(this.logged.username).subscribe((workers: AgencyWorker[]) => {
        this.allMyWorkers = workers;
        this.isLoading = false;
      })
    }
  }

  addWorker() {
    this.workerService.addWorker(this.logged.username, this.newFirstName, this.newLastName, this.newEmail, this.newPhone, this.newSpecialty).subscribe((response) => {
      if(response['status'] == "ok") {
        this.newSuccess = true;
        this.ngOnInit();
      }
    })
  }

  fill(i) {
    this.editId = this.allMyWorkers[i].workerId
    this.editFirstName = this.allMyWorkers[i].firstName
    this.editLastName = this.allMyWorkers[i].lastName
    this.editEmail = this.allMyWorkers[i].email
    this.editPhone = this.allMyWorkers[i].phone
    this.editSpecialty = this.allMyWorkers[i].specialty
  }

  editWorker() {
    this.workerService.editWorker(this.editId, this.editFirstName, this.editLastName, this.editEmail, this.editPhone, this.editSpecialty).subscribe((response) => {
      if(response['status'] == "ok") {
        this.editSuccess = true;
        this.ngOnInit();
      }
    })
  }

  removeWorker(id) {
    this.workerService.removeWorker(id).subscribe((response) => {
      if(response['status'] == "ok") {
        this.ngOnInit();
      }
    })
  }

  sendRequest() {
    this.requestService.addWorkersRequest(this.logged.username, this.amount).subscribe((response) => {
      if(response['status'] == "ok") this.reqSuccess = true;
    })
  }
}
