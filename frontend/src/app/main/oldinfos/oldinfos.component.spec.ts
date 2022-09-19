import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldinfosComponent } from './oldinfos.component';

describe('OldinfosComponent', () => {
  let component: OldinfosComponent;
  let fixture: ComponentFixture<OldinfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldinfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
