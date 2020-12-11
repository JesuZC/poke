import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinycardsComponent } from './tinycards.component';

describe('TinycardsComponent', () => {
  let component: TinycardsComponent;
  let fixture: ComponentFixture<TinycardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinycardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
