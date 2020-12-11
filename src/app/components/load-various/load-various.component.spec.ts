import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadVariousComponent } from './load-various.component';

describe('LoadVariousComponent', () => {
  let component: LoadVariousComponent;
  let fixture: ComponentFixture<LoadVariousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadVariousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadVariousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
