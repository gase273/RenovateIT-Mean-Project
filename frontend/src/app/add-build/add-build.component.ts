import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { Door } from '../models/door';
import { Building } from '../models/building';
import ajv from 'ajv';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { BuildingService } from '../services/building.service';



@Component({
  selector: 'app-add-build',
  templateUrl: './add-build.component.html',
  styleUrls: ['./add-build.component.css']
})
export class AddBuildComponent implements OnInit {
  @ViewChild('canvasElement', { static: true })
  canvasRef: ElementRef<HTMLCanvasElement>;
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  logged: User

  currentDoor: Door = null;
  currentRoom: Room = null;
  isValid = false;
  isDragging = false;
  width: number = 0;
  height: number = 0;

  type: string = "house";
  address: string = "";
  squares: number = 0;
  doors: Door[] = [];
  rooms: Room[] = [];

  building: Building = null;
  buildFile: File;
  buildFileStr: string;
  fileFail = false;
  fileBad = false;

  saveSuccess: boolean = false;
  saveFail: boolean = false;

  schema = {
    type: "object",
    properties: {
      type: {type: "string"},
      address: {type: "string"},
      squares: {type: "integer"},
      rooms: {type: "array", maxItems: 3},
      doors: {type: "array"}
    },
    required: ["type", "address", "squares", "rooms", "doors"]
  }

  Ajv = new ajv();
  validate = this.Ajv.compile(this.schema)

  constructor(private router: Router, private buildService: BuildingService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(sessionStorage.getItem("loggedIn"))
    if(!(this.logged && this.logged.type == 0)) {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
    this.canvasElement = this.canvasRef.nativeElement;
    this.context = this.canvasElement.getContext('2d');
  }

  //--------------------------------------------------------Event Handleri--------------------------------------------------------

  handleMouseMove(event: MouseEvent) {

    //ako se soba premesta, pomerajem misa ce se pomerati na kanvasu
    if (this.isDragging && this.currentRoom) {
      this.currentRoom.x = event.offsetX;
      this.currentRoom.y = event.offsetY;
      this.redraw();
    }
    else if (this.isDragging && this.currentDoor) {
      this.currentDoor.x = event.offsetX;
      this.currentDoor.y = event.offsetY;
      this.redraw();
    }
  }

  handleMouseDown(event: MouseEvent) {

    //pritiskom i drzanjem levog klika proverava se da li je kliknuta neka soba ili neka vrata, ako jeste ona se premesta
    for(let door of this.doors){
      if (event.offsetX > door.x && event.offsetX < door.x + 20 &&
        event.offsetY > door.y && event.offsetY < door.y + 20) {
        this.currentDoor = door;
        this.isDragging = true;
        return; //vrata imaju prioritet
      }
    }

    for(let room of this.rooms) {
      if (event.offsetX > room.x && event.offsetX < room.x + room.width &&
        event.offsetY > room.y && event.offsetY < room.y + room.height
      ) {
        this.currentRoom = room;
        this.isDragging = true;
      }
    };
  }

  handleMouseUp() {
    //pustanjem levog klika soba se postavlja u krajnji polozaj, izvrsava se provera validnosti soba u objektu
    this.isDragging = false;
    this.currentRoom = null;
    this.currentDoor = null;

    //provera validnosti crteza
    this.isValid = this.checkValid();
    this.redraw()
  }

//--------------------------------------------------------Pomocne fje--------------------------------------------------------

  checkTouch(room1, room2) { //da li se sobe dodiruju, uz malo preklapanja lufta

    //proverava da li je room1 desno ili levo od room2, isto tako i za room2 zbog simetrije
    if((room1.x > room2.x + room2.width - 3 && room1.x < room2.x + room2.width + 3) ||
        (room2.x + room2.width > room1.x - 3 && room2.x + room2.width < room1.x + 3) ||
        (room2.x > room1.x + room1.width - 3 && room2.x < room1.x + room1.width + 3) ||
        (room1.x + room1.width > room2.x - 3 && room1.x + room1.width < room2.x + 3))
        {
          //proverava da li se room1 i room2 stvarno dodiruju, preko visina (lakse se objasni kad se nacrta)
          if(room1.y < room2.y + room2.height && room2.y < room1.y + room1.height) return true;
        }
    //isto kao gore samo je sad iznad ili ispod
    if((room1.y > room2.y + room2.height - 3 && room1.y < room2.y + room2.height + 3) ||
       (room2.y + room2.height > room1.y - 3 && room2.y + room2.height < room1.y + 3) ||
       (room2.y > room1.y + room1.height - 3 && room2.y < room1.y + room1.height + 3) ||
       (room1.y + room1.height > room2.y - 3 && room1.y + room1.height < room2.y + 3))
        {
          if(room1.x < room2.x + room2.width && room2.x < room1.x + room1.width) return true;
       }
    return false;
  }

  checkDoorTouch(door, room) { //da li vrata dodiruju sobu
    //po horizontali samo desna ivica vrata i desna ivica sobe, kao i leva ivica vrata i leva ivica sobe
    if((door.x > room.x - 3 && door.x < room.x + 3) ||
        (door.x + 20 > room.x + room.width - 3 && door.x + 20 < room.x + room.width + 3))
        {
          //provera po vertikali
          if(door.y >= room.y && door.y + 20 <= room.y + room.height) return true;
        }
    //po vertikali samo gornja i gornja i donja i donja ivica
    if((door.y > room.y - 3 && door.y < room.y + 3) ||
        (door.y + 20 > room.y + room.height - 3 && door.y + 20 < room.y + room.height + 3))
        {
          if(door.x >= room.x && door.x + 20 <= room.x + room.width) return true;
        }
    return false;
  }

  addRoom() {
    //dodavanje nove sobe
    const room = new Room((this.canvasElement.width - this.width) / 2, (this.canvasElement.height - this.height) / 2, this.width, this.height);
    this.rooms.push(room);
    this.isValid = this.checkValid();
    this.redraw();
  }


  addDoor() {
    //dodavanje novih vrata
    const door = new Door((this.canvasElement.width - 20) / 2, (this.canvasElement.height - 20) / 2)
    this.doors.push(door)
    this.isValid = this.checkValid();
    this.redraw()
  }

  redraw() {
    //ponovno crtanje skice
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.rooms.forEach(room => {
      this.context.save();

      if (this.currentRoom == room) this.context.strokeStyle = 'rgba(249, 180, 45, 0.5)'
      else if (!this.isValid) this.context.strokeStyle = 'rgba(255, 0, 0, 0.5)'
      else this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
      this.context.lineWidth = 3
      this.context.strokeRect(room.x, room.y, room.width, room.height);
      if (this.currentRoom != room && this.isValid) {
        this.context.fillStyle = room.color
        this.context.fillRect(room.x + 1, room.y + 1, room.width - 1.5, room.height - 1.5)
      }
    });

    this.doors.forEach(door => {
      this.context.save();

      if(this.currentDoor == door) this.context.fillStyle = 'rgba(249, 180, 45, 0.5)'
      else if (!this.isValid) this.context.fillStyle = 'rgba(255, 0, 0, 0.3)'
      else this.context.fillStyle = 'rgba(181, 101, 29, 0.9)'
      this.context.fillRect(door.x, door.y, 20, 20)
    })
  }

  checkValid() {
    let i = 0;
    let j = 0;
    let roomHasDoor = [false, false, false];

    //prvo proverava da li su sva vrata u dodiru sa bilo kojom sobom
    for(; i < this.doors.length; i++) {
      for(j = 0; j < this.rooms.length; j++) {
        if(this.checkDoorTouch(this.doors[i], this.rooms[j])) {
          roomHasDoor[j] = true; //belezi da svaka soba ima vrata
          break
        };
      }
      if(j == this.rooms.length) return false;
    }

    //zatim, ako je broj soba veci od 1, proverava se da li su sobe medjusobno u dodiru
    if(this.rooms.length > 1) {
      for(i = 0; i < this.rooms.length; i++) {
        for(j = 0; j < this.rooms.length; j++) {
          if(i != j) {
            if(this.checkTouch(this.rooms[i], this.rooms[j])) break;
          }
        }
        if(j == this.rooms.length) return false;
      }
    }

    //provera da li svaka soba ima jedna vrata
    for(i = 0; i < this.rooms.length; i++) {
      if(!roomHasDoor[i]) return false;
    }
    return true;
  }

  delAll() {
    //brisanje skice
    this.rooms = [];
    this.doors = []; //moze ovako
    this.isValid = false;
    this.redraw()
  }

  fileChosen(event:any) {
    if(event.target.value) this.buildFile = <File>event.target.files[0]
    if (this.buildFile) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.buildFileStr = e.target.result;
        console.log(this.buildFileStr); // Sadrzaj fajla kao string
      };
      reader.readAsText(this.buildFile);
    }
    else this.buildFile = null;
  }

  addJSON() {
    if(this.buildFileStr) {
      let valid = this.validate(JSON.parse(this.buildFileStr));
      if(valid) {
        this.building = JSON.parse(this.buildFileStr)
        this.type = this.building.type;
        this.address = this.building.address;
        this.squares = this.building.squares;
        this.rooms = this.building.rooms;
        this.doors = this.building.doors;
        this.fileBad = false;
        this.fileFail = false;
        this.isValid = this.checkValid();
        this.redraw()
      }
      else this.fileBad = true;
    }
    else this.fileFail = true;
  }

  saveBuilding() {
    this.buildService.addBuilding(this.logged.username, this.type, this.address, this.squares, this.rooms, this.doors).subscribe((response) => {
      if(response['status']=="ok") this.saveSuccess = true;
      else this.saveFail = true;
    })
  }

}
