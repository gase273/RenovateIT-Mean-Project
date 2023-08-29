import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenJobsComponent } from './agen-jobs.component';

describe('AgenJobsComponent', () => {
  let component: AgenJobsComponent;
  let fixture: ComponentFixture<AgenJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
