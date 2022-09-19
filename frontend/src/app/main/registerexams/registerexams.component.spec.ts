import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterexamsComponent } from './registerexams.component';

describe('RegisterexamsComponent', () => {
  let component: RegisterexamsComponent;
  let fixture: ComponentFixture<RegisterexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterexamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
