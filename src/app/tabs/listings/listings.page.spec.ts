import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ListingsPage } from './listings.page';

describe('ListingsPage', () => {
  let component: ListingsPage;
  let fixture: ComponentFixture<ListingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
