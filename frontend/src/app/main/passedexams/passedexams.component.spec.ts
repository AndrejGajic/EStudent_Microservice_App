import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedexamsComponent } from './passedexams.component';

describe('PassedexamsComponent', () => {
  let component: PassedexamsComponent;
  let fixture: ComponentFixture<PassedexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedexamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassedexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
