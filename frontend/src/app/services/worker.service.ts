import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  uri = 'http://localhost:4000/workers'

  constructor(private http: HttpClient) { }

  addWorker(agency, firstname, lastname, email, phone, specialty) {
    const data = {
      agency: agency,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      specialty: specialty
    }

    return this.http.post(`${this.uri}/addWorker`, data)
  }

  editWorker(id, firstname, lastname, email, phone, specialty) {
    const data = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      specialty: specialty
    }

    return this.http.post(`${this.uri}/editWorker`, data)
  }

  removeWorker(id) {
    return this.http.get(`${this.uri}/rmWorker?id=${id}`)
  }

  assignWorker(jobId, workerId) {
    const data = {
      jobId: jobId,
      workerId: workerId
    }

    return this.http.post(`${this.uri}/asgnWorker`, data)
  }

  releaseWorkers(id) {
    return this.http.get(`${this.uri}/relWorkers?id=${id}`)
  }

  getAllAvailable(name) {
    const data = {
      agencyname: name
    }
    return this.http.post(`${this.uri}/getAvailWorker`, data)
  }

  getAllOnJob(id) {
    return this.http.get(`${this.uri}/getOnJobWorker?id=${id}`)
  }

  getAllFromAgency(name) {
    const data = {
      agencyname: name
    }
    return this.http.post(`${this.uri}/getFromAgency`, data)
  }
}
