import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosencoursesComponent } from './chosencourses.component';

describe('ChosencoursesComponent', () => {
  let component: ChosencoursesComponent;
  let fixture: ComponentFixture<ChosencoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosencoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosencoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
