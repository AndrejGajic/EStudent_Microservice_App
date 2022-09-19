import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredexamsComponent } from './registeredexams.component';

describe('RegisteredexamsComponent', () => {
  let component: RegisteredexamsComponent;
  let fixture: ComponentFixture<RegisteredexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredexamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
