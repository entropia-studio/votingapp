import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartFooterComponent } from './piechart-footer.component';

describe('PiechartFooterComponent', () => {
  let component: PiechartFooterComponent;
  let fixture: ComponentFixture<PiechartFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
