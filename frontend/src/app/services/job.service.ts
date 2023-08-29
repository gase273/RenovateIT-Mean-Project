import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  uri = 'http://localhost:4000/jobs'

  constructor(private http: HttpClient) { }

  addJob(obj, client, agency, deadline) {
    const data = {
      objId: obj,
      client: client,
      agency: agency,
      deadline: deadline
    }

    return this.http.post(`${this.uri}/addJob`, data);
  }

  getAllJobs() {
    return this.http.get(`${this.uri}/getAllJobs`);
  }

  getClientJobs(username) {
    const data = {
      clientName: username
    }

    return this.http.post(`${this.uri}/getCliJobs`, data);
  }

  getAgentRequests(username) {
    const data = {
      agencyName: username
    }

    return this.http.post(`${this.uri}/getAgentReq`, data);
  }

  getAgentWorking(username) {
    const data = {
      agencyName: username
    }

    return this.http.post(`${this.uri}/getAgentWork`, data);
  }

  getJobById(id) {
    return this.http.get(`${this.uri}/getJob?id=${id}`);
  }

  setOffer(id, price) {
    const data = {
      jobId: id,
      price: price
    }
    return this.http.post(`${this.uri}/setJobOffer`, data);
  }

  agencyRefuse(id) {
    return this.http.get(`${this.uri}/refJob?id=${id}`);
  }

  clientRefuse(id) {
    return this.http.get(`${this.uri}/delJob?id=${id}`);
  }

  delJobs(id) {
    return this.http.get(`${this.uri}/delJobs?id=${id}`);
  }

  delJob(id) {
    return this.http.get(`${this.uri}/delJob?id=${id}`);
  }

  clientAccept(id) {
    return this.http.get(`${this.uri}/acceptJob?id=${id}`);
  }

  agencyFinish(id) {
    return this.http.get(`${this.uri}/agencyFinish?id=${id}`);
  }

  clientFinish(id) {
    return this.http.get(`${this.uri}/clientFinish?id=${id}`);
  }

  cancelJob(id) {
    return this.http.get(`${this.uri}/cancelJob?id=${id}`);
  }
}
