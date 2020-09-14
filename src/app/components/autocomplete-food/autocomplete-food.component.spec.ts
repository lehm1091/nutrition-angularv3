import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFoodComponent } from './autocomplete-food.component';

describe('AutocompleteFoodComponent', () => {
  let component: AutocompleteFoodComponent;
  let fixture: ComponentFixture<AutocompleteFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
