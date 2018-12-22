import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageuiComponent } from './messageui.component';

describe('MessageuiComponent', () => {
  let component: MessageuiComponent;
  let fixture: ComponentFixture<MessageuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
