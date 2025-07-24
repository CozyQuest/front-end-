import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGrid } from './carousel-grid';

describe('CarouselGrid', () => {
  let component: CarouselGrid;
  let fixture: ComponentFixture<CarouselGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
