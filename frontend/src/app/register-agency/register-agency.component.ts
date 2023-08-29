import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-agency',
  templateUrl: './register-agency.component.html',
  styleUrls: ['./register-agency.component.css']
})
export class RegisterAgencyComponent implements OnInit {

  agencyName: string;
  address: string;
  pib: string;
  desc: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  confirm: string;
  img: File;
  badChosen: boolean = false;
  allUsers: User[];
  registerFail: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    //dovlaci sve korisnike na front da se proveri jedinstvenost, nije najbolje znam
    this.userService.fetchUsers().subscribe((users: User[]) => this.allUsers = users);
  }

  async fileChosen(event:any) {
    //izbor slike i provera validnosti
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

  registerAgency() {
    //ako kor ime i email nisu jedinstveni nista se ne radi
    for(let u of this.allUsers) {
      if(this.username == u.username) {
        alert("Korisnicko ime nije jedinstveno!");
        return;
      }
      if(this.email == u.email) {
        alert("Email nije jedinstven!");
        return;
      }
    }

    let form = new FormData();
    //registracija
    form.append("profile_pic", this.img);
    form.append("username", this.username);
    form.append("password", this.password);
    form.append("phone", this.phone);
    form.append("email", this.email);
    form.append("agencyname", this.agencyName);
    form.append("address", this.address);
    form.append("pib", this.pib);
    form.append("desc", this.desc);
    this.userService.registerAgency(form).subscribe((response) => {
      if (response['status'] == "ok") this.router.navigate(['login']);
      else this.registerFail = true;

    });
  }
}
