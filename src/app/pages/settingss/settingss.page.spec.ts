import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingssPage } from './settingss.page';

describe('SettingssPage', () => {
  let component: SettingssPage;
  let fixture: ComponentFixture<SettingssPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingssPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
