import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHostRequests } from './user-host-requests';

describe('UserHostRequests', () => {
  let component: UserHostRequests;
  let fixture: ComponentFixture<UserHostRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHostRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHostRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
