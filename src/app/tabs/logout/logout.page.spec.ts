import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoutPage } from './logout';

describe('LogoutPage', () => {
  let component: LogoutPage;
  let fixture: ComponentFixture<LogoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
