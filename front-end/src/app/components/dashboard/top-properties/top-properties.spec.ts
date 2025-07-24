import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProperties } from './top-properties';

describe('TopProperties', () => {
  let component: TopProperties;
  let fixture: ComponentFixture<TopProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopProperties]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopProperties);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
