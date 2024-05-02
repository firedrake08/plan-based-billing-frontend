import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlansComponent } from './add-plans.component';

describe('AddPlansComponent', () => {
  let component: AddPlansComponent;
  let fixture: ComponentFixture<AddPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
