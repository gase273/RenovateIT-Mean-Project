import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliJobsComponent } from './cli-jobs.component';

describe('CliJobsComponent', () => {
  let component: CliJobsComponent;
  let fixture: ComponentFixture<CliJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
