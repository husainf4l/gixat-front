import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAddComponent } from './car-add.component';

describe('CarAddComponent', () => {
  let component: CarAddComponent;
  let fixture: ComponentFixture<CarAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
