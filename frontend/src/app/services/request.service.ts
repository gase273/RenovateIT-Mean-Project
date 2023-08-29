import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  uri = 'http://localhost:4000/reqs'

  constructor(private http: HttpClient) { }

  getAllReqs() {
    return this.http.get(`${this.uri}/getAll`);
  }

  getCancelRequest(jobId) {
    const data = {
      jobId: jobId
    }
    return this.http.post(`${this.uri}/getCancel`, data);
  }

  getWorkersRequest(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getWorkers`, data);
  }

  addCancelRequest(username, reason, jobId) {
    const data = {
      username: username,
      reason: reason,
      jobId: jobId
    }
    return this.http.post(`${this.uri}/addCancel`, data);
  }

  addWorkersRequest(username, workerNum) {
    const data = {
      username: username,
      workerNum: workerNum
    }
    return this.http.post(`${this.uri}/addWorkers`, data);
  }

  delCancelRequest(jobId) {
    const data = {
      jobId: jobId
    }
    return this.http.post(`${this.uri}/delCancel`, data)
  }

  delWorkersRequest(username, workerNum) {
    const data = {
      username: username,
      workerNum: workerNum
    }
    return this.http.post(`${this.uri}/delWorkers`, data)
  }

}
