import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodComparsionComponent } from './food-comparsion.component';

describe('FoodComparsionComponent', () => {
  let component: FoodComparsionComponent;
  let fixture: ComponentFixture<FoodComparsionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodComparsionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodComparsionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
