import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabssComponent } from './tabss.component';

describe('TabssComponent', () => {
  let component: TabssComponent;
  let fixture: ComponentFixture<TabssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
