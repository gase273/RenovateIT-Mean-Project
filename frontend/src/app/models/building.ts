import { Door } from "./door";
import { Room } from "./room";

export class Building {
  buildId: number;
  type: string;
  address: string;
  squares: number;
  roomsNum: number;
  rooms: Room[];
  doors: Door[];
}
