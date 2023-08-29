import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000/users'

  constructor(private http: HttpClient) { }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data)
  }

  registerClient(info) {
    return this.http.post(`${this.uri}/registerClient`, info)
  }

  addClient(info) {
    return this.http.post(`${this.uri}/addClient`, info)
  }

  fetchUsers() {
    return this.http.get(`${this.uri}/fetchUsers`)
  }

  registerAgency(info) {
    return this.http.post(`${this.uri}/registerAgency`, info)
  }

  addAgency(info) {
    return this.http.post(`${this.uri}/addAgency`, info)
  }

  editClientData(user, firstName, lastName, phone, email) {
    const data = {
      username: user,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email
    }

    return this.http.post(`${this.uri}/editClient`, data)
  }

  editAgencyData(user, agencyName, address, desc, email, phone) {
    const data = {
      username: user,
      agencyName: agencyName,
      address: address,
      desc: desc,
      email: email,
      phone: phone
    }

    return this.http.post(`${this.uri}/editAgency`, data)
  }

  editPassword(user, oldPass, newPass) {
    const data = {
      username: user,
      password: oldPass,
      newPass: newPass
    }

    return this.http.post(`${this.uri}/editPass`, data)
  }

  editImg(img) {
    return this.http.post(`${this.uri}/editImg`, img)
  }

  resetPass(email) {
    const data = {email: email}
    return this.http.post(`${this.uri}/resetPass`, data)
  }

  getAgencies() {
    return this.http.get(`${this.uri}/getAllAgencies`)
  }

  getUser(username) {
    return this.http.get(`${this.uri}/getUser?user=${username}`)
  }

  getReviews(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getReviews`, data)
  }

  leaveReview(agencyName, clientName, rating, comment, jobId) {
    const data = {
      agencyName: agencyName,
      clientName: clientName,
      rating: rating,
      comment: comment,
      jobId: jobId,

    }

    return this.http.post(`${this.uri}/leaveReview`, data)
  }

  updateReview(jobId, rating, comment) {
    const data = {
      jobId: jobId,
      rating: rating,
      comment: comment
    }

    return this.http.post(`${this.uri}/updateReview`, data)
  }

  setStatus(user, status) {
    const data = {
      username: user,
      status: status
    }

    return this.http.post(`${this.uri}/setStatus`, data)
  }

  fetchUsersNoAdmin() {
    return this.http.get(`${this.uri}/fetchNoAdmin`)
  }

  delUser(user) {
    const data = {
      username: user
    }
    return this.http.post(`${this.uri}/delUser`, data)
  }

  incWorkers(user) {
    const data = {
      username: user
    }
    return this.http.post(`${this.uri}/incWorkers`, data);
  }

  setWorkers(user, workerNum) {
    const data = {
      username: user,
      workerNum: workerNum
    }
    return this.http.post(`${this.uri}/setWorkers`, data);
  }

  delReview(user, jobId) {
    const data = {
      username: user,
      jobId: jobId
    }
    return this.http.post(`${this.uri}/delReview`, data);
  }
}
