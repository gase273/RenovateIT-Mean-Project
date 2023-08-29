import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyRequest } from '../models/myrequest';
import { RequestService } from '../services/request.service';
import { AgencyWorker } from '../models/worker';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  allUsers: User[];

  //------------------------------------------------------generalne stvari------------------------------------------------------
  isLoading: boolean = true;
  user: User;
  logged: User;
  workers: AgencyWorker[];
  request: MyRequest;
  hasRequest: boolean = false;

  //------------------------------------------------------podaci o korisniku------------------------------------------------------
  firstname: string;
  lastname: string;
  agencyName: string;
  address: string;
  email: string;
  phone: string;
  desc: string;
  dataChange: boolean = false;
  dataChangeFail: boolean = false;
  password: string;
  newPassword: string;
  confirm: string;
  passChange: boolean = false;
  passChangeFail: boolean = false;
  passChangeText: string;
  badChosen: boolean = false;
  img: File;
  imgChange: boolean = false;
  imgChangeFail: boolean = false;
  imgChangeText: string;

  //------------------------------------------------------podaci o novom radniku------------------------------------------------------
  newFirstName: string;
  newLastName: string;
  newEmail: string;
  newPhone: string;
  newSpecialty: string;
  newSuccess: boolean = false;

  //------------------------------------------------------podaci o izmeni radnika------------------------------------------------------
  editId: number;
  editFirstName: string;
  editLastName: string;
  editEmail: string;
  editPhone: string;
  editSpecialty: string;
  editSuccess: boolean = false;


  constructor(private userService: UserService, private requestService: RequestService,
    private workerService: WorkerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 2) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    else {
      let username = this.route.snapshot.paramMap.get("username");
      this.userService.fetchUsers().subscribe((users: User[]) => {
        this.allUsers = users;
        this.userService.getUser(username).subscribe((usr: User) => {
          this.user = usr;
          this.email = this.user.email;
          this.phone = this.user.phone
          if(usr.type == 1) {
            this.agencyName = this.user.agencyName;
            this.address = this.user.address;
            this.desc = this.user.desc;
            this.workerService.getAllFromAgency(username).subscribe((allWorkers: AgencyWorker[]) => {
              this.workers = allWorkers;
              this.requestService.getWorkersRequest(username).subscribe((req: MyRequest) => {
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
          }
          else {
            this.firstname = this.user.firstName;
            this.lastname = this.user.lastName;
            this.isLoading = false;
          }
        })
      })
    }
  }

  async fileChosen(event:any) {
    //isto kao kod registracije
    if(event.target.value) {
      this.img = <File>event.target.files[0]
      let img = new Image();
      img.src = URL.createObjectURL(this.img);
      await img.decode();
      if(img.naturalWidth < 100 || img.naturalWidth > 300 || img.naturalHeight < 100 || img.naturalHeight > 300) this.badChosen = true;
      else this.badChosen = false;
    }
    else {
      this.badChosen = false;
      this.img = null;
    }
  }

  changeImg() {
    //isto kao kod registracije
    let form = new FormData()
    form.append("profile_pic", this.img)
    form.append("user", this.user.username)
    this.userService.editImg(form).subscribe((response) => {
      if(response['status'] == 'ok') {
        this.imgChange = true;
        this.imgChangeText = "Ikonica uspešno izmenjena!"
        this.logged.img = response["newImg"]
        sessionStorage.setItem("loggedIn", JSON.stringify(this.logged))
        this.ngOnInit()
      }
      else {
        this.imgChangeFail = true;
        this.imgChangeText = "Greška pri izmeni ikonice!"
      }
    })
  }

  changeClientData() {

    for(let u of this.allUsers) {
      if (this.email == u.email && this.user != u) {
        alert("Email nije jedinstven!");
        return;
      }
    }

    this.userService.editClientData(this.user.username, this.firstname, this.lastname, this.phone, this.email).subscribe((response) => {
      if(response['status'] == "ok") {

        //podaci izmenjeni u bazi, sada moraju da se izmene u sessionStorage
        this.dataChange = true
        this.logged.firstName = this.firstname
        this.logged.lastName = this.lastname
        this.logged.phone = this.phone
        this.logged.email = this.email
        sessionStorage.setItem("loggedIn", JSON.stringify(this.logged))
      }
      else this.dataChangeFail = true
    })
  }

  changeAgencyData() {

    for(let u of this.allUsers) {
      if (this.email == u.email) {
        alert("Email nije jedinstven!");
        return;
      }
    }

    this.userService.editAgencyData(this.user.username, this.logged.agencyName, this.address, this.desc, this.email, this.phone).subscribe((response) => {
      if(response['status'] == "ok") { //podaci izmenjeni u bazi, sada moraju da se izmene u sessionStorage
        this.dataChange = true;
        this.logged.agencyName = this.agencyName;
        this.logged.address = this.address;
        this.logged.desc = this.desc;
        this.logged.phone = this.phone;
        this.logged.email = this.email;
        sessionStorage.setItem("loggedIn", JSON.stringify(this.logged));
      }
      else this.dataChangeFail = true
    })
  }

  addWorker() {
    this.workerService.addWorker(this.user.username, this.newFirstName, this.newLastName, this.newEmail, this.newPhone, this.newSpecialty).subscribe((response1) => {
      if(response1['status'] == "ok") {
        if(this.workers.length + 1 >= this.user.allowedWorkers) {
          this.userService.incWorkers(this.user.username).subscribe((response2) => {
            if(response2['status'] == "ok") {
              this.newSuccess = true;
              this.ngOnInit();
            }
          })
        }
        else {
          this.newSuccess = true;
          this.ngOnInit();
        }
      }
    })
  }

  fill(i) {
    this.editId = this.workers[i].workerId
    this.editFirstName = this.workers[i].firstName
    this.editLastName = this.workers[i].lastName
    this.editEmail = this.workers[i].email
    this.editPhone = this.workers[i].phone
    this.editSpecialty = this.workers[i].specialty
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

  acceptRequest() {
    this.userService.setWorkers(this.user.username, this.request.workerNum).subscribe((response1) => {
      if(response1['status'] == "ok") {
        this.requestService.delWorkersRequest(this.user.username, this.request.workerNum).subscribe((response2) => {
          if(response2['status'] == "ok") {
            alert("Zahtev prihvacen");
            this.ngOnInit();
          }
        })
      }
    })

  }

  refuseRequest() {
    this.requestService.delWorkersRequest(this.user.username, this.request.workerNum).subscribe((response) => {
      if(response['status'] == "ok") {
        alert("Zahtev odbijen");
        this.ngOnInit();
      }
    })
  }

  delReview(id) {
    this.userService.delReview(this.user.username, id).subscribe((response) => {
      if(response['status'] == "ok") this.ngOnInit();
    })
  }
}
