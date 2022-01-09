import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoginComponent } from './data-login.component';

describe('DataLoginComponent', () => {
  let component: DataLoginComponent;
  let fixture: ComponentFixture<DataLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
