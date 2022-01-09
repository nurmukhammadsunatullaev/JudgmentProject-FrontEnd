import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBlockListComponent } from './data-block-list.component';

describe('DataBlockListComponent', () => {
  let component: DataBlockListComponent;
  let fixture: ComponentFixture<DataBlockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBlockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
