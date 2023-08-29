import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  allUsers: User[];

  logged: User;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
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

  constructor(private router: Router, private usrService: UserService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"))
    if(this.logged && this.logged.type == 0) {
      this.firstname = this.logged.firstName;
      this.lastname = this.logged.lastName;
      this.email = this.logged.email;
      this.phone = this.logged.phone;
      this.usrService.fetchUsers().subscribe((users: User[]) => {
        this.allUsers = users;
      })
    }
    else {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
  }

  changeData() {

    for(let u of this.allUsers) {
      if (this.email == u.email && this.logged != u) {
        alert("Email nije jedinstven!");
        return;
      }
    }

    this.usrService.editClientData(this.logged.username, this.firstname, this.lastname, this.phone, this.email).subscribe((response) => {
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

  changePass() {
    this.usrService.editPassword(this.logged.username, this.password, this.newPassword).subscribe((response) => {
      if(response) {
        //sifra je uspesno promenjena ako se poklopio jedan korisnik, a to se desi ako je user+pass kombinacija dobra
        if(response['matchedCount'] == 1) {
          this.passChange = true
          this.passChangeText = "Uspešno izmenjena lozinka!"
          this.logged.password = this.password
          sessionStorage.setItem("loggedIn", JSON.stringify(this.logged))
        }
        else {
          this.passChangeFail = true
          this.passChangeText = "Pogrešno uneta stara lozinka!"
        }
      }
      else {
        this.passChangeFail = true
        this.passChangeText = "Greška pri izmeni lozinke!"
      }

    })
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
    form.append("user", this.logged.username)
    this.usrService.editImg(form).subscribe((response) => {
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
}
