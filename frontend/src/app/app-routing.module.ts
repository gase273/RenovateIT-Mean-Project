import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './default/default.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterAgencyComponent } from './register-agency/register-agency.component';
import { ResetComponent } from './reset/reset.component';
import { BuildingComponent } from './building/building.component';
import { AddBuildComponent } from './add-build/add-build.component';
import { EditBuildComponent } from './edit-build/edit-build.component';
import { AgencyDetailsComponent } from './agency-details/agency-details.component';
import { RequestJobComponent } from './request-job/request-job.component';
import { CliJobsComponent } from './cli-jobs/cli-jobs.component';
import { AgenJobsComponent } from './agen-jobs/agen-jobs.component';
import { ReqDetailsComponent } from './req-details/req-details.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { WorkersComponent } from './workers/workers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';

const routes: Routes = [
  {path: "login", component: LoginComponent, title: "Login"},
  {path: "registerClient", component: RegisterUserComponent, title: "Register"},
  {path: "registerAgency", component: RegisterAgencyComponent, title: "Register"},
  {path: "", component: DefaultComponent, title: "Pia Projekat"},
  {path: "loginAdmin", component: LoginComponent, title: "Secret"},
  {path: "admin", component: AdminComponent, title: "Admin"},
  {path: "client", component: ClientComponent, title: "Profil"},
  {path: "agency", component: AgencyComponent, title: "Profil"},
  {path: "reset", component: ResetComponent, title: "Reset Lozinke"},
  {path: "cliBuildings", component: BuildingComponent, title: "Objekti"},
  {path: "addBuilding", component: AddBuildComponent, title: "Dodaj Objekat"},
  {path: "editBuilding", component: EditBuildComponent, title: "Izmeni Objekat"},
  {path: "cliAgencies", component: DefaultComponent, title: "Agencije"},
  {path: "agencyDetails", component: AgencyDetailsComponent, title: "Detalji"},
  {path: "requestJob", component: RequestJobComponent, title: "Zatraži Saradnju"},
  {path: "cliJobs", component: CliJobsComponent, title: "Vaši Poslovi"},
  {path: "agenJobs", component: AgenJobsComponent, title: "Vaši Poslovi"},
  {path: "reqDetails", component: ReqDetailsComponent, title: "Pregled Zahteva"},
  {path: "jobDetails", component: JobDetailsComponent, title: "Pregled Posla"},
  {path: "agenWorkers", component: WorkersComponent, title: "Vaši Radnici"},
  {path: "userDetails", component: UserDetailsComponent, title: "Detalji Korisnika"},
  {path: "addClient", component: AddClientComponent, title: "Dodavanje Klijenta"},
  {path: "addAgency", component: AddAgencyComponent, title: "Dodavanje Agencije"},
  {path: "adminJobs", component: AdminJobsComponent, title: "Svi poslovi"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
