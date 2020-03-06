import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MshopkeeperPage } from './mshopkeeper.page';

describe('MshopkeeperPage', () => {
  let component: MshopkeeperPage;
  let fixture: ComponentFixture<MshopkeeperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MshopkeeperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MshopkeeperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
