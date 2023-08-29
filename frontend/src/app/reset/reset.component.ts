import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private usrService: UserService) { }

  email: string
  success: boolean = false;
  fail: boolean = false;
  statusText: string;

  ngOnInit(): void {
  }

  reset() {
    this.usrService.resetPass(this.email).subscribe((response) => {
      if(response['status'] == "ok") {
          this.success = true;
          this.statusText = "Uspesno resetovanje lozinke!"
      }
      else {
        this.fail = true;
        this.statusText = "Greska!"
      }
    })
  }
}
