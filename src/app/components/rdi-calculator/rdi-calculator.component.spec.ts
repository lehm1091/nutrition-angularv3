import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdiCalculatorComponent } from './rdi-calculator.component';

describe('RdiCalculatorComponent', () => {
  let component: RdiCalculatorComponent;
  let fixture: ComponentFixture<RdiCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdiCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
