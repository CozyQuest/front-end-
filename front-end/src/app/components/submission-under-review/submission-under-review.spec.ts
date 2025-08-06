import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionUnderReview } from './submission-under-review';

describe('SubmissionUnderReview', () => {
  let component: SubmissionUnderReview;
  let fixture: ComponentFixture<SubmissionUnderReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionUnderReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionUnderReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
