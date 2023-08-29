import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

   //sve isto kao i kod agencije
   logged: User

   firstname: string
   lastname: string
   username: string
   password: string
   email: string
   phone: string
   confirm: string
   img: File
   badChosen: boolean = false
   allUsers: User[]
   registerFail: boolean = false

   constructor(private userService: UserService, private router: Router) { }

   ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"));
    if(!this.logged || this.logged.type != 2) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    this.userService.fetchUsers().subscribe((users: User[]) => this.allUsers = users)
   }

   async fileChosen(event:any) {
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

   addClient() {
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
     form.append("profile_pic", this.img)
     form.append("firstName", this.firstname)
     form.append("lastName", this.lastname)
     form.append("username", this.username)
     form.append("password", this.password)
     form.append("phone", this.phone)
     form.append("email", this.email)
     this.userService.addClient(form).subscribe((response) => {
       if (response['status'] == "ok") this.router.navigate(['login']);
       else this.registerFail = true;

     });
   }
}

