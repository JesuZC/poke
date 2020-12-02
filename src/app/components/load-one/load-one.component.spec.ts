import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadOneComponent } from './load-one.component';

describe('LoadOneComponent', () => {
  let component: LoadOneComponent;
  let fixture: ComponentFixture<LoadOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
