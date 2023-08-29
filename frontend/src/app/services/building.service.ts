import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  uri = 'http://localhost:4000/builds'

  constructor(private http: HttpClient) { }

  addBuilding(owner, type, address, squares, rooms, doors) {
    const data = {
      owner: owner,
      type: type,
      address: address,
      squares: squares,
      rooms: rooms,
      doors: doors,
    }
    return this.http.post(`${this.uri}/addBuild`, data);
  }

  getClientBuildings(owner) {
    const data = {
      owner: owner
    }
    return this.http.post(`${this.uri}/getCliBuilds`, data);
  }

  removeClientBuilding(id) {
    return this.http.get(`${this.uri}/rmBuild?id=${id}`);
  }

  getBuilding(id) {
    return this.http.get(`${this.uri}/getBuild?id=${id}`);
  }

  editBuilding(id, owner, type, address, squares, rooms, doors) {
    const data = {
      id: id,
      owner: owner,
      type: type,
      address: address,
      squares: squares,
      rooms: rooms,
      doors: doors,
    }
    return this.http.post(`${this.uri}/editBuild`, data);
  }

  colorAllRooms(id, color) {
    const data = {
      id: id,
      color: color
    }

    return this.http.post(`${this.uri}/colorAll`, data)
  }

  colorOneRoom(id, color, index) {
    const data = {
      id: id,
      color: color,
      index: index
    }
    return this.http.post(`${this.uri}/colorOne`, data)
  }
}
