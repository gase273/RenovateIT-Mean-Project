import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './default/default.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterAgencyComponent } from './register-agency/register-agency.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ResetComponent } from './reset/reset.component';
import { BuildingComponent } from './building/building.component';
import { AddBuildComponent } from './add-build/add-build.component';
import { EditBuildComponent } from './edit-build/edit-build.component';
import { AgencyDetailsComponent } from './agency-details/agency-details.component';
import { RequestJobComponent } from './request-job/request-job.component';
import { CliJobsComponent } from './cli-jobs/cli-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AgenJobsComponent } from './agen-jobs/agen-jobs.component';
import { ReqDetailsComponent } from './req-details/req-details.component';
import { WorkersComponent } from './workers/workers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultComponent,
    ClientComponent,
    AgencyComponent,
    AdminComponent,
    RegisterUserComponent,
    RegisterAgencyComponent,
    NavbarComponent,
    FooterComponent,
    ResetComponent,
    BuildingComponent,
    AddBuildComponent,
    EditBuildComponent,
    AgencyDetailsComponent,
    RequestJobComponent,
    CliJobsComponent,
    JobDetailsComponent,
    AgenJobsComponent,
    ReqDetailsComponent,
    WorkersComponent,
    UserDetailsComponent,
    AddClientComponent,
    AddAgencyComponent,
    AdminJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
