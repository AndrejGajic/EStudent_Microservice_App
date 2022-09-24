import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursechoosingComponent } from './coursechoosing.component';

describe('CoursechoosingComponent', () => {
  let component: CoursechoosingComponent;
  let fixture: ComponentFixture<CoursechoosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursechoosingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursechoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
